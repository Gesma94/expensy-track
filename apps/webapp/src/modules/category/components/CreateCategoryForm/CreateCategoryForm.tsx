import { z } from 'zod';
import { CategoryType, type CreateCategoryMutation, GetMyCategoriesDocument } from '../../../../gql/graphql';
import { CategoryIcon as CategoryIconEnum } from './../../../../gql/graphql';

import { useMutation } from '@apollo/client';
import { CategoryIcon } from '@components/CategoryIcon/CategoryIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@modules/toast/hooks/useToast';
import { useForm } from 'react-hook-form';
import { CREATE_CATEGORY } from '../../graphql/mutations';

const formSchema = z.object({
  type: z.nativeEnum(CategoryType),
  displayName: z.string().min(1, 'must have length 1'),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'must be a valid color'),
  icon: z.nativeEnum(CategoryIconEnum)
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateCategoryForm = () => {
  const { successToast } = useToast();
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });
  const [createCategoryMutation, { error }] = useMutation(CREATE_CATEGORY, {
    awaitRefetchQueries: true,
    onCompleted,
    refetchQueries: [{ query: GetMyCategoriesDocument }]
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    createCategoryMutation({ variables: { input: data } });
  }

  function onCompleted(data: CreateCategoryMutation) {
    successToast('OK', 'category craeted!');
  }

  return (
    <div>
      <p>Add new category</p>

      {error?.message}

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <label htmlFor='display-name-input'>Name</label>
        <input id='display-name-input' {...register('displayName')} defaultValue={''} placeholder='display name' />

        <label htmlFor='color-input'>Color</label>
        <input id='color-input' {...register('color')} defaultValue={''} placeholder='color' />

        <button type='submit'>Create</button>
      </form>
    </div>
  );
};
