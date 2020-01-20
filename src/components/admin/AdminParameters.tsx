import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiHighlight, EuiFieldText, EuiComboBox, EuiInMemoryTable } from '@elastic/eui';
import ParameterForm from './forms/ParameterForm';
import { Divider } from 'semantic-ui-react';
import Category from 'classes/Category';

export interface AdminParametersProps {}

const AdminParameters: React.SFC<AdminParametersProps> = () => {
  const [search, setSearch] = useState('');
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const categories = useSelector((state: ReduxState) => state.quiz.categories);

  const handleChange = (e) => {
    console.log(e);
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id
  }));
  const columns = [
    {
      field: 'id',
      name: 'ID'
    },
    {
      field: 'name',
      name: 'Name',
      render: (name: string) => <EuiHighlight search={search}>{name}</EuiHighlight>
    },
    {
      name: 'Categories',
      field: 'categories',
      render: (categories: Category[]) => (
        <EuiComboBox
          selectedOptions={categories.map((category) => ({
            label: category.name,
            value: category.id
          }))}
          options={categoryOptions}
          onChange={handleChange}
        />
      )
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
        items={parameters.filter((parameter) =>
          parameter.name.toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        pagination
      />
      <Divider />
      <ParameterForm />
    </div>
  );
};

export default AdminParameters;
