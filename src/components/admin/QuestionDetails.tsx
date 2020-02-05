import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiInMemoryTable, EuiText } from '@elastic/eui';
import { StyledDivider } from 'styles/layout';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import ParameterForm from './forms/ParameterForm';
import QuestionParameterForm from './forms/QuestionParameterForm';
import { Divider } from 'semantic-ui-react';
import AdminParameters from './AdminParameters';
import Question, { QuestionAnswer } from 'classes/Question';
import { EuiButton } from '@elastic/eui';

export interface QuestionDetailsProps {}

const QuestionDetails: React.SFC<QuestionDetailsProps> = () => {
  const questionId = Number(useParams<{ questionId: string }>().questionId);
  const question = useSelector((state: ReduxState) =>
    state.admin.questions.find((question) => question.id === questionId)
  );

  const columns = [
    {
      field: 'id',
      name: 'ID'
    },
    {
      field: 'value',
      name: 'Value'
    },
    {
      field: 'point',
      name: 'Points'
    },
    {
      name: 'Actions',
      render: (questionParameter: QuestionAnswer) => (
        <div>
          <EuiButton
            size="s"
            color="danger"
            onClick={() => Question.deleteAnswer(questionParameter.id)}
          >
            Slet
          </EuiButton>
        </div>
      )
    }
  ];

  return (
    <div>
      <EuiText>
        <p>Question parameters</p>
      </EuiText>
      <EuiInMemoryTable items={question.answers} columns={columns} />
      <StyledDivider />
      <EuiFlexGroup>
        <EuiFlexItem>
          <QuestionParameterForm questionId={question.id} />
        </EuiFlexItem>
        <EuiFlexItem>
          <ParameterForm />
        </EuiFlexItem>
      </EuiFlexGroup>
      <Divider />
      <AdminParameters />
    </div>
  );
};

export default QuestionDetails;
