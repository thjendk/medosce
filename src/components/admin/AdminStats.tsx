import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiStat } from '@elastic/eui';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Routes from 'classes/Routes';

export interface AdminStatsProps {}

const AdminStats: React.SFC<AdminStatsProps> = () => {
  const history = useHistory();
  const { examSets, stations, questions } = useSelector((state: ReduxState) => state.admin);
  const { parameters } = useSelector((state: ReduxState) => state.quiz);

  return (
    <EuiFlexGroup alignItems="flexStart">
      <EuiFlexItem>
        <EuiStat titleSize="m" title={examSets.length} description="Exam Sets" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat titleSize="m" title={stations.length} description="Stations" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat titleSize="m" title={questions.length} description="Questions" />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiStat
          titleSize="m"
          title={parameters.length}
          description="Parameters"
          onClick={() => history.push(Routes.adminParameters.path)}
          style={{ cursor: 'pointer' }}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default AdminStats;
