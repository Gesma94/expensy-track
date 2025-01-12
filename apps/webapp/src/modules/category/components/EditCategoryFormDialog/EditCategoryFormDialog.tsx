import { CategoryIconName } from '@components/layout/CategoryIconName/CategoryIconName';
import { CategoryTypeName } from '@components/layout/CategoryTypeName/CategoryTypeName';
import { Heading } from '@components/ui/Heading/Heading';
import { LoadingModal } from '@components/ui/LoadingModal/LoadingModal';
import { Button } from '@components/ui/buttons/Button/Button';
import { Dialog } from '@components/ui/dialogs/Dialog/Dialog';
import { Form } from '@components/ui/form/Form/Form';
import { FormColorPicker } from '@components/ui/form/FormColorPicker/FormColorPicker';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Option } from '@components/ui/input/Select/Option';
import { zodResolver } from '@hookform/resolvers/zod';
import { editCategoryMutation } from '@modules/category/operations/edit-category-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { type PropsWithChildren, useContext } from 'react';
import { DialogTrigger, OverlayTriggerStateContext } from 'react-aria-components';
import { type FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CategoryIcon as CategoryIconEnum,
  type CategoryListElementFragment,
  CategoryType
} from '../../../../gql/graphql';

type Props = {
  onEdit: () => void;
  categoryToEdit: CategoryListElementFragment;
};

const formSchema = z.object({
  color: z.string(),
  type: z.nativeEnum(CategoryType),
  icon: z.nativeEnum(CategoryIconEnum),
  displayName: z.string().min(1, 'must have length 1').default('test def')
});

type FormSchema = z.infer<typeof formSchema>;

export const EditCategoryFormDialog = ({ onEdit, categoryToEdit, children }: PropsWithChildren<Props>) => {
  return (
    <DialogTrigger>
      {children}
      <DialogTriggerContent categoryToEdit={categoryToEdit} onEdit={onEdit} />
    </DialogTrigger>
  );
};

function DialogTriggerContent({ categoryToEdit, onEdit }: Props) {
  const { successToast, errorToast } = useToast();
  const overlayTriggerStateContext = useContext(OverlayTriggerStateContext);
  const { mutate, isPending } = useMutation({
    mutationKey: ['edit-category'],
    mutationFn: editCategoryMutation,
    onSuccess,
    onError
  });
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: categoryToEdit.displayName,
      color: categoryToEdit.color,
      icon: categoryToEdit.icon,
      type: categoryToEdit.type
    }
  });

  function handleCancel() {
    overlayTriggerStateContext?.close();
  }

  function onValid(data: FormSchema) {
    mutate({ input: { id: categoryToEdit.id, color: data.color, displayName: data.displayName, icon: data.icon } });
  }

  function onSuccess() {
    successToast('category craeted!');
    onEdit();
    overlayTriggerStateContext?.close();
  }

  function onInvalid(errors: FieldErrors<FormSchema>) {
    console.error(errors);
    errorToast('Category could not be created');
  }

  function onError() {
    errorToast('couldnt edit category');
  }

  return (
    <>
      {isPending && <LoadingModal message={false} isTransparent={true} />}
      <Dialog className='w-screen max-w-96'>
        <Heading slot='title'>Edit {categoryToEdit.displayName}</Heading>
        <Form onSubmit={handleSubmit(onValid, onInvalid)}>
          <FormSelect control={control} name='type' label='Type'>
            <Option id={CategoryType.Expanse} textValue={CategoryType.Expanse}>
              <CategoryTypeName categoryType={CategoryType.Expanse} />
            </Option>
            <Option id={CategoryType.Income} textValue={CategoryType.Income}>
              <CategoryTypeName categoryType={CategoryType.Income} />
            </Option>
          </FormSelect>

          <FormSelect control={control} name='icon' label='icon'>
            {Object.values(CategoryIconEnum).map(categoryIcon => (
              <Option id={categoryIcon} key={categoryIcon} textValue={categoryIcon}>
                <div className='flex items-center gap-2'>
                  <CategoryIcon icon={categoryIcon} /> <CategoryIconName icon={categoryIcon} />
                </div>
              </Option>
            ))}
          </FormSelect>

          <FormTextInput label='Name' control={control} name='displayName' />

          <FormColorPicker control={control} name='color' colorFormat='hex' label='Color' />

          <div className='mt-4 flex gap-2 justify-end'>
            <Button type='button' onPress={handleCancel}>
              Cancel
            </Button>
            <Button type='submit'>Confirm</Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
}
