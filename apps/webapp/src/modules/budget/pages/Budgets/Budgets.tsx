import { ROUTES } from '@common/consts/routes';
import { Heading } from '@components/Heading/Heading';
import { Link } from '@components/Link/Link';
import { GetBudgetsSnapshot } from '@modules/budget/operations/get-budgets-snapshot';
import { useQuery } from '@tanstack/react-query';
import { useFragment } from '../../../../gql';
import { BudgetsPageBudgetSnapshotFragmentDoc } from '../../../../gql/graphql';

export function Budgets() {
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ['user-budgets-snapshot'],
    queryFn: GetBudgetsSnapshot
  });
  const budgetSnapshots = useFragment(BudgetsPageBudgetSnapshotFragmentDoc, data?.budgetsSnapshot?.result);

  return (
    <div>
      {isFetching && <p>Loading</p>}
      {error && <p>error while loading</p>}
      {!isFetching && (
        <>
          <Heading level={1}>Budgets</Heading>
          <Link href={ROUTES.BUDGETS.CREATE()}>Create new Budget</Link>
          <ul>
            {budgetSnapshots?.map(snapshot => (
              <li key={snapshot.budget.id} className='bg-slate-500 p-3'>
                <p>{snapshot.budget.displayName}</p>
                <p>remaining: {snapshot.remainingAllowance}</p>
                <progress max={snapshot.expectedExpense} value={snapshot.actualExpense} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
