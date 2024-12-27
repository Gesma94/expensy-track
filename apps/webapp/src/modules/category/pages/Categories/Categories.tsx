import { Panel } from '@components/layout/Panel/Panel';
import { Heading } from '@components/ui/Heading/Heading';
import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { CreateCategoryDrawer } from '@modules/category/components/CreateCategoryDrawer/CreateCategoryDrawer';
import { getCategoriesByTypeQuery } from '@modules/category/operations/get-categories-by-type-query';
import { useQuery } from '@tanstack/react-query';
import { DialogTrigger } from 'react-aria-components';
import { PiPlus } from 'react-icons/pi';
import { CategoryList } from '../../components/CategoryList/CategoryList';

export const Categories = () => {
  const { data, refetch } = useQuery({ queryKey: ['user-categories'], queryFn: () => getCategoriesByTypeQuery({}) });

  function handleDeleteCategorySuccess() {
    refetch();
  }

  function handleEditCategorySuccess() {
    refetch();
  }

  function handleCreateCategorySuccess() {
    refetch();
  }
  return (
    <>
      <div className='w-full max-w-6xl mx-auto pt-14 px-4 md:px-10'>
        <section className='grid grid-cols-[1fr_auto] grid-rows-[auto_auto]'>
          <Heading level={1} className='col-start-1 row-start-1 text-2xl'>
            Categories
          </Heading>
          <Text className='col-start-1 row-start-2 font-medium text-lg text-foreground-mediumPriority'>
            Manage your spending and income categories
          </Text>
          <div className='col-start-2 row-start-1 row-span-2 self-end'>
            <DialogTrigger>
              <Button variant='primary' iconBefore={PiPlus}>
                Create a new category
              </Button>
              <CreateCategoryDrawer
                onSuccess={handleCreateCategorySuccess}
                incomeRootCategories={[]}
                expanseRootCategories={[]}
              />
            </DialogTrigger>
          </div>
        </section>

        <section className='mt-8'>
          <div className='grid grid-cols-2 gap-4'>
            <Panel title='Spending Categories'>
              <CategoryList
                onEdit={handleEditCategorySuccess}
                onDelete={handleDeleteCategorySuccess}
                groupedCategories={data?.categoriesByType?.result?.expanseCategories}
              />
            </Panel>
            <Panel title='Income categories'>
              <CategoryList
                onEdit={handleEditCategorySuccess}
                onDelete={handleDeleteCategorySuccess}
                groupedCategories={data?.categoriesByType?.result?.incomeCategories}
              />
            </Panel>
          </div>
        </section>
      </div>
    </>
  );
};
