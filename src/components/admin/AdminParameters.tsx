import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiHighlight, EuiFieldText, EuiInMemoryTable } from '@elastic/eui';
import ParameterForm from './forms/ParameterForm';
import { Divider } from 'semantic-ui-react';
import Parameter from 'classes/Parameter';

export interface AdminParametersProps {}

const AdminParameters: React.SFC<AdminParametersProps> = () => {
  const [search, setSearch] = useState('');
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);

  const columns = [
    {
      field: 'id',
      name: 'Int',
      sortable: true
    },
    {
      name: 'Name',
      render: (parameter: Parameter) => (
        <EuiHighlight search={search}>{parameter.name}</EuiHighlight>
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
        sorting
      />
      <Divider />
      <ParameterForm />
    </div>
  );
};

export default AdminParameters;
