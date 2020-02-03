import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Divider } from 'semantic-ui-react';
import { EuiButton, EuiInMemoryTable, EuiText } from '@elastic/eui';
import { useHistory, useLocation } from 'react-router-dom';
import Routes from 'classes/Routes';
import ExamSetForm from './forms/ExamSetForm';

export interface AdminExamSetProps {}

const AdminExamSet: React.SFC<AdminExamSetProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const examSets = useSelector((state: ReduxState) => state.admin.examSets);

  const columns = [
    {
      field: 'id',
      name: 'ID',
      sortable: true
    },
    {
      field: 'season',
      name: 'Season',
      sortable: true
    },
    {
      field: 'year',
      name: 'Year',
      sortable: true
    },
    {
      name: 'Edit',
      field: 'id',
      render: (id: number) => (
        <EuiButton
          size="s"
          color="primary"
          onClick={() => history.push(location.pathname + Routes.adminExamSet.dynamicPath(id))}
        >
          Edit
        </EuiButton>
      )
    }
  ];

  return (
    <div>
      <EuiText>
        <p>ExamSets</p>
      </EuiText>
      <EuiInMemoryTable pagination columns={columns} items={examSets} />
      <Divider />
      <ExamSetForm />
    </div>
  );
};

export default AdminExamSet;
