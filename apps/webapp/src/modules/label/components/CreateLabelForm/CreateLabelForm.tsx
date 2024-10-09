import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CREATE_LABEL } from '@modules/label/graphql/mutations';
import { useToast } from '@modules/toast/hooks/useToast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { GetMyLabelsDocument } from '../../../../gql/graphql';

const formSchema = z.object({
  displayName: z.string().min(1, 'must have length 1')
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateLabelForm() {
  const { successToast } = useToast();
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });
  const [createLabelMutation, { error }] = useMutation(CREATE_LABEL, {
    awaitRefetchQueries: true,
    onCompleted: () => successToast('OK', 'label created!'),
    refetchQueries: [{ query: GetMyLabelsDocument }]
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    createLabelMutation({ variables: { input: data } });
  }

  return (
    <div>
      <p>Add new label</p>

      {error?.message}

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='display-name-input'>Name</label>
        <input id='display-name-input' {...register('displayName')} defaultValue={''} placeholder='display name' />

        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
