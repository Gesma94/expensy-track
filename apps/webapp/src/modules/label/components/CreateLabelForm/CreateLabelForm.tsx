import { zodResolver } from '@hookform/resolvers/zod';
import { createLabelMutation } from '@modules/label/operations/create-label';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
  onSuccess: () => void;
};

const formSchema = z.object({
  displayName: z.string().min(1, 'must have length 1')
});

type FormSchema = z.infer<typeof formSchema>;

export function CreateLabelForm({ onSuccess: parentOnSuccess }: Props) {
  const { successToast, errorToast } = useToast();
  const { mutate, error } = useMutation({
    mutationKey: ['create-label'],
    mutationFn: createLabelMutation,
    onSuccess,
    onError
  });
  const { register, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  });

  function onSubmit(data: FormSchema, event?: React.BaseSyntheticEvent) {
    event?.preventDefault();
    mutate({ input: data });
  }

  function onSuccess() {
    successToast('label created!');
    parentOnSuccess();
  }

  function onError() {
    console.error(error);
    errorToast('Category could not be created');
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
