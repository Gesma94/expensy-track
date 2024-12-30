import { LoadingModal } from '@components/ui/LoadingModal/LoadingModal';
import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { ClosingHeadingDialog } from '@components/ui/dialogs/ClosingHeadingDialog/ClosingHeadingDialog';
import { Dialog } from '@components/ui/dialogs/Dialog/Dialog';
import { Form } from '@components/ui/form/Form/Form';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import type { CategoryListElementFragment } from '@gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryGroup } from '@modules/category/hooks/useCategoryGroup';
import { mergeCategoriesMutation } from '@modules/category/operations/merge-categories-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { type PropsWithChildren, useCallback, useContext, useEffect } from 'react';
import {
  DialogTrigger as AriaDialogTrigger,
  OverlayTriggerStateContext as AriaOverlayTriggerStateContext
} from 'react-aria-components';
import { type FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryOption } from './sub-components/CategoryOption/CategoryOption';

type Props = {
  onSuccess: () => void;
  allCategories: CategoryListElementFragment[];
  targetCategory?: CategoryListElementFragment;
};

export function MergeCategoriesFormDialog({
  onSuccess,
  allCategories,
  targetCategory,
  children
}: PropsWithChildren<Props>) {
  return (
    <AriaDialogTrigger>
      {children}
      <DialogTriggerContent onSuccess={onSuccess} allCategories={allCategories} targetCategory={targetCategory} />
    </AriaDialogTrigger>
  );
}

function DialogTriggerContent({ onSuccess: propsOnSuccess, targetCategory }: Props) {
  const { successToast, errorToast } = useToast();

  const { categories } = useCategoryGroup();
  const overlayTriggerStateContext = useContext(AriaOverlayTriggerStateContext)!;

  const getFormInitialValues = useCallback<() => FormSchema>(() => {
    return { targetCategoryId: targetCategory?.id ?? '', sourceCategoryId: '' };
  }, [targetCategory?.id]);

  const { handleSubmit, control, watch, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormInitialValues()
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['merge-categories'],
    mutationFn: mergeCategoriesMutation,
    onSuccess,
    onError
  });
  const { sourceCategoryId, targetCategoryId } = watch();

  function onSuccess() {
    successToast('delete successfully');
    propsOnSuccess();

    overlayTriggerStateContext.close();
  }

  function onValid(data: FormSchema) {
    mutate({
      input: {
        sourceCategoryId: data.sourceCategoryId,
        targetCategoryId: data.targetCategoryId
      }
    });
  }

  function onError() {
    errorToast('couldnt delete categories');
  }

  function onInvalid(fieldErrors: FieldErrors<FormSchema>) {
    console.table(fieldErrors);
  }

  useEffect(() => {
    if (overlayTriggerStateContext.isOpen) {
      reset(getFormInitialValues());
    }
  }, [reset, getFormInitialValues, overlayTriggerStateContext.isOpen]);

  return (
    <>
      {isPending && <LoadingModal message={false} isTransparent={true} />}
      <Dialog dialogClassName='p-6 max-w-xl'>
        <ClosingHeadingDialog heading='Merge categories' />

        <div className='mt-4 flex flex-col'>
          <Text className='text-dialog-text'>
            Select two categories to merge: all transactions and subcategories from the source will be moved to the
            target category.
          </Text>
          <Form onSubmit={handleSubmit(onValid, onInvalid)} className='min-w-96 mt-4'>
            <FormSelect
              control={control}
              isDisabled={!!targetCategory}
              placeholder='Select target category'
              name='targetCategoryId'
              label='Target category'
            >
              {categories.map(category => (
                <CategoryOption key={category.id} category={category} otherCategoryId={sourceCategoryId} />
              ))}
            </FormSelect>

            <FormSelect
              control={control}
              placeholder='Select source category'
              name='sourceCategoryId'
              label='Source category'
              className='mt-4'
            >
              {categories.map(category => (
                <CategoryOption key={category.id} category={category} otherCategoryId={targetCategoryId} />
              ))}
            </FormSelect>

            <div className='mt-10 justify-self-end flex gap-2'>
              <Button size='small' className='w-32' variant='ghost' onPress={overlayTriggerStateContext.close}>
                Cancel
              </Button>
              <Button type='submit' size='small' className='w-32' variant='primary'>
                Merge
              </Button>
            </div>
          </Form>
        </div>
      </Dialog>
    </>
  );
}

const formSchema = z.object({
  targetCategoryId: z.string().min(1, 'Please select a target category'),
  sourceCategoryId: z.string().min(1, 'Please select a source category')
});

type FormSchema = z.infer<typeof formSchema>;
