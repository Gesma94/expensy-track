import { useQuery } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { ConfirmDeleteLabelsDialog } from '@modules/label/components/ConfirmDeleteLabelsDialog/ConfirmDeleteLabelsDialog';
import { CreateLabelForm } from '@modules/label/components/CreateLabelForm/CreateLabelForm';
import { LabelListElement } from '@modules/label/components/LabelListElement/LabelListElement';
import { LabelRootContextProvider } from '@modules/label/components/LabelRootContextProvider/LabelRootContextProvider';
import { GET_MY_LABELS } from '@modules/label/graphql/queries';
import { useLabelRoot } from '@modules/label/hooks/useCategorySelection';
import { useState } from 'react';
import { useFragment } from '../../../../gql';
import { MyLabelFragmentDoc } from '../../../../gql/graphql';

export function Labels() {
  return (
    <LabelRootContextProvider>
      <InnerLabels />
    </LabelRootContextProvider>
  );
}
export function InnerLabels() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { loading, data, error } = useQuery(GET_MY_LABELS);
  const labelsFragment = useFragment(MyLabelFragmentDoc, data?.labels?.result);
  const { selectedLabels } = useLabelRoot();

  function handleDeleteLabelsPress() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <ConfirmDeleteLabelsDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} labelsToDelete={selectedLabels} />
      <div>
        {loading && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!loading && (
          <>
            <Heading level={1}>Labels</Heading>
            <p>{labelsFragment?.length} / 500</p>
            <div>
              <CreateLabelForm />
            </div>
            <div>
              <ul>
                {labelsFragment?.map(label => (
                  <LabelListElement key={label.id} label={label} />
                ))}
              </ul>
            </div>
          </>
        )}
        {selectedLabels.length > 0 && (
          <Button onPress={handleDeleteLabelsPress}>Delete ({selectedLabels.length}) selected labels</Button>
        )}
      </div>
    </>
  );
}
