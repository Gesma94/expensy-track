import { gql } from '../../../gql';

export const CREATE_LABEL = gql(`
  mutation CreateLabel($input: CreateLabelInput!) {
    createLabel(input: $input) {
      success
      error { ... GraphqlError }
      result { ... MyLabel }
    }
  }
`);

export const DELETE_LABELS = gql(`
mutation DeleteLabels($input: DeleteLabelsInput!) {
  deleteLabels(input: $input) {
      success
      error { ... GraphqlError }
      result
  }
}
`);
