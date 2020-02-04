import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { EuiInMemoryTable } from '@elastic/eui';
import { EuiTitle } from '@elastic/eui';
import { Divider } from 'semantic-ui-react';
import { EuiButton } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { StyledDivider } from 'styles/layout';
import Routes from 'classes/Routes';
import StationForm from './forms/StationForm';

export interface AdminExamSetDetails {}

const AdminExamSetDetails: React.SFC<AdminExamSetDetails> = () => {
  const examSetId = Number(useParams<{ examSetId: string }>().examSetId);
  const history = useHistory();
  const location = useLocation();
  const examSet = useSelector((state: ReduxState) =>
    state.admin.examSets.find((examSet) => examSet.id === examSetId)
  );
  const stations = useSelector((state: ReduxState) =>
    state.admin.stations.filter((station) => station.examSet.id === examSetId)
  );

  const columns = [
    {
      field: 'id',
      name: 'Int'
    },
    {
      field: 'intro',
      name: 'Intro',
      truncateText: true
    },
    {
      field: 'globalScore',
      name: 'Global score'
    },
    {
      field: 'stationNumber',
      name: 'Station number'
    },
    {
      field: 'id',
      name: 'Edit',
      render: (id: number) => (
        <EuiButton
          color="primary"
          size="s"
          onClick={() => history.push(location.pathname + Routes.adminStation.dynamicPath(id))}
        >
          Edit
        </EuiButton>
      )
    }
  ];

  return (
    <div>
      <EuiTitle>
        <h1>
          Exam Set {examSet.season}
          {examSet.year}
        </h1>
      </EuiTitle>
      <Divider />
      <EuiText>
        <p>Stations</p>
      </EuiText>
      <StyledDivider small />
      <EuiInMemoryTable items={stations} columns={columns} />
      <Divider />
      <StationForm examSetId={examSet.id} />
    </div>
  );
};

export default AdminExamSetDetails;
