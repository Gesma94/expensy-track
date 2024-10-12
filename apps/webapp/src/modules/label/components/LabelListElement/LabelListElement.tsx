import { Button } from '@components/Button/Button';
import { Checkbox } from '@components/input/Checkbox/Checkbox';
import { useLabelRoot } from '@modules/label/hooks/useCategorySelection';
import { useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import type { MyLabelFragment } from '../../../../gql/graphql';
import { ConfirmDeleteLabelsDialog } from '../ConfirmDeleteLabelsDialog/ConfirmDeleteLabelsDialog';

type Props = {
  label: MyLabelFragment;
};

export const LabelListElement = ({ label }: Props) => {
  const { isSelected, toggleLabel } = useLabelRoot();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { displayName } = label;

  function handleDeletePress() {
    setIsDialogOpen(true);
  }

  function handleSelectionChange() {
    toggleLabel(label);
  }

  return (
    <>
      <ConfirmDeleteLabelsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} labelsToDelete={[label]} />
      <div className='flex flex-row'>
        <Checkbox isSelected={isSelected(label)} onChange={handleSelectionChange} />
        <p>{displayName}</p>
        <Button onPress={handleDeletePress}>
          <PiTrash />
        </Button>
      </div>
    </>
  );
};
