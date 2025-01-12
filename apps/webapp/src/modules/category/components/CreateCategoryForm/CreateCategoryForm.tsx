import { CategoryIconName } from '@components/layout/CategoryIconName/CategoryIconName';
import { CategoryTypeName } from '@components/layout/CategoryTypeName/CategoryTypeName';
import { Button } from '@components/ui/buttons/Button/Button';
import { Form } from '@components/ui/form/Form/Form';
import { FormColorPicker } from '@components/ui/form/FormColorPicker/FormColorPicker';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Option } from '@components/ui/input/Select/Option';
import { zodResolver } from '@hookform/resolvers/zod';
import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { type FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryType, CreateCategoryDocument, type CreateCategoryMutationVariables } from '../../../../gql/graphql';
import { CategoryIcon as CategoryIconEnum } from './../../../../gql/graphql';

type Props = {
  onSuccess: () => void;
};

async function mutationFn(variables: CreateCategoryMutationVariables) {
  return getGqlClient().request(CreateCategoryDocument, variables);
}

const formSchema = z.object({
  color: z.string(),
  type: z.nativeEnum(CategoryType),
  icon: z.nativeEnum(CategoryIconEnum),
  displayName: z.string().min(1, 'must have length 1').default('test def')
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateCategoryForm = ({ onSuccess: parentOnSuccess }: Props) => {
  const { successToast, errorToast } = useToast();
  const { mutate } = useMutation({ mutationKey: ['create-category'], mutationFn, onSuccess, onError: onInvalid });
  const { handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: '', color: '#E86161', icon: CategoryIconEnum.Briefcase, type: CategoryType.Expanse }
  });

  function onValid(data: FormSchema) {
    mutate({ input: data });
  }

  function onSuccess() {
    successToast('category craeted!');
    parentOnSuccess();
  }

  function onInvalid(errors: FieldErrors<FormSchema>) {
    console.error(errors);
    errorToast('Category could not be created');
  }

  return (
    <div>
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

        <Button className='mt-4' type='submit'>
          Create
        </Button>
      </Form>
    </div>
  );
};
