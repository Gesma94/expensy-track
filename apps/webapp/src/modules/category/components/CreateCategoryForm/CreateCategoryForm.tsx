import { Form } from '@components/form/Form/Form';
import { FormTextInput } from '@components/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/icon/CategoryIcon/CategoryIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
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
  type: z.nativeEnum(CategoryType),
  icon: z.nativeEnum(CategoryIconEnum),
  displayName: z.string().min(1, 'must have length 1').default('test def'),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'must be a valid color')
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateCategoryForm = ({ onSuccess: parentOnSuccess }: Props) => {
  const { successToast, errorToast } = useToast();
  const { mutate, error } = useMutation({ mutationKey: ['create-category'], mutationFn, onSuccess, onError });
  const { register, handleSubmit, control } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { displayName: '', color: '#FFFFFF', icon: CategoryIconEnum.Activity, type: CategoryType.Expanse }
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate({ input: data });
  }

  function onSuccess() {
    successToast('OK', 'category craeted!');
    parentOnSuccess();
  }

  function onError() {
    console.error(error);
    errorToast('Error', 'Category could not be created');
  }

  return (
    <div>
      <p>Add new category</p>

      {error?.message}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('type')}>
          <option value={CategoryType.Expanse}>Expanse</option>
          <option value={CategoryType.Income}>Income</option>
        </select>

        <select {...register('icon')}>
          {Object.values(CategoryIconEnum).map(categoryIcon => (
            <option key={categoryIcon} value={categoryIcon}>
              <CategoryIcon icon={categoryIcon} /> - {categoryIcon}
            </option>
          ))}
        </select>

        <FormTextInput label='Name' control={control} name='displayName' />

        <label htmlFor='color-input'>Color</label>
        <input id='color-input' {...register('color')} defaultValue={''} placeholder='color' />

        <button type='submit'>Create</button>
      </Form>
    </div>
  );
};
