import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiInMemoryTable, EuiButton } from '@elastic/eui';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Routes from 'classes/Routes';
import { Divider } from 'semantic-ui-react';
import QuestionForm from './forms/QuestionForm';

export interface StationDetailsProps {}

const StationDetails: React.SFC<StationDetailsProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { stationId } = useParams<{ stationId: string }>();
  const questions = useSelector((state: ReduxState) =>
    state.admin.questions.filter((question) => question.station.id === stationId)
  );

  const columns = [
    {
      name: 'Id',
      field: 'id'
    },
    {
      name: 'Question Number',
      field: 'questionNumber'
    },
    {
      name: 'Text',
      field: 'text'
    },
    {
      name: 'Edit',
      field: 'id',
      render: (id: string) => (
        <EuiButton
          size="s"
          onClick={() => history.push(location.pathname + Routes.adminQuestion.dynamicPath(id))}
        >
          Edit
        </EuiButton>
      )
    }
  ];

  return (
    <div>
      <EuiInMemoryTable items={questions} columns={columns} pagination />
      <Divider />
      <QuestionForm stationId={stationId} />
    </div>
  );
};

export default StationDetails;
