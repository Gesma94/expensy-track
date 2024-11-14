import { Button } from '@components/ui/Button/Button';
import { Form } from '@components/ui/form/Form/Form';
import { FormSelect } from '@components/ui/form/FormSelect/FormSelect';
import { FormTextInput } from '@components/ui/form/FormTextInput/FormTextInput';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Option } from '@components/ui/input/Select/Select';
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
      {error?.message}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormSelect control={control} name='type' label='Type'>
          <Option id={CategoryType.Expanse} textValue={CategoryType.Expanse}>
            Expanse
          </Option>
          <Option id={CategoryType.Income} textValue={CategoryType.Income}>
            Income
          </Option>
        </FormSelect>

        <FormSelect control={control} name='icon' label='icon'>
          {Object.values(CategoryIconEnum).map(categoryIcon => (
            <Option id={categoryIcon} key={categoryIcon} textValue={categoryIcon} className='flex bg-white'>
              <CategoryIcon icon={categoryIcon} /> - {categoryIcon}
            </Option>
          ))}
        </FormSelect>

        <FormTextInput label='Name' control={control} name='displayName' />

        <label htmlFor='color-input'>Color</label>
        <input id='color-input' {...register('color')} defaultValue={''} placeholder='color' />

        <Button type='submit'>Create</Button>
      </Form>
    </div>
  );
};
