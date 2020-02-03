import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiInMemoryTable, EuiButton } from '@elastic/eui';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Routes from 'classes/Routes';
import { Divider, Dropdown } from 'semantic-ui-react';
import QuestionForm from './forms/QuestionForm';
import Question from 'classes/Question';

export interface StationDetailsProps {}

const StationDetails: React.SFC<StationDetailsProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const stationId = Number(useParams<{ stationId: string }>().stationId);
  const questions = useSelector((state: ReduxState) =>
    state.admin.questions.filter((question) => question.station.id === stationId)
  );
  const questionTypes = useSelector((state: ReduxState) => state.admin.questionTypes);
  const questionTypeOptions = questionTypes.map((questionType) => ({
    key: questionType.id,
    value: questionType.id,
    text: questionType.name
  }));

  const handleChange = async (questionId: number, questionTypeIds: number[]) => {
    await Question.update(questionId, { questionTypeIds });
  };

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
      name: 'Question types',
      render: (question: Question) => (
        <Dropdown
          multiple
          selection
          search
          options={questionTypeOptions}
          value={question.questionTypes.map((questionType) => questionType.id)}
          onChange={(e, { value }) => handleChange(question.id, value as number[])}
        />
      )
    },
    {
      name: 'Edit',
      field: 'id',
      render: (id: number) => (
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
      <EuiInMemoryTable items={questions} columns={columns} />
      <Divider />
      <QuestionForm stationId={stationId} />
    </div>
  );
};

export default StationDetails;
