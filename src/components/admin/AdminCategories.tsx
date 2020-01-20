import React, { useState } from 'react';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { EuiHighlight, EuiInMemoryTable, EuiFieldText } from '@elastic/eui';
import { Divider } from 'semantic-ui-react';
import CategoryForm from './forms/CategoryForm';

export interface AdminCategoriesProps {}

const AdminCategories: React.SFC<AdminCategoriesProps> = () => {
  const [search, setSearch] = useState('');
  const categories = useSelector((state: ReduxState) => state.quiz.categories);

  const columns = [
    {
      field: 'id',
      name: 'ID'
    },
    {
      field: 'name',
      name: 'Name',
      render: (name: string) => <EuiHighlight search={search}>{name}</EuiHighlight>
    }
  ];
  return (
    <div>
      <EuiFieldText
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search..."
      />
      <EuiInMemoryTable
        items={categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        pagination
      />
      <Divider />
      <CategoryForm />
    </div>
  );
};

export default AdminCategories;
