import React from 'react';
import Question from 'classes/Question';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Table, Icon } from 'semantic-ui-react';
import UserAnswer from 'classes/UserAnswer';
import { DetailText } from 'styles/text';

export interface AnswerProps {
  answer: UserAnswer;
  question: Question;
}

const Answer: React.SFC<AnswerProps> = ({ answer, question }) => {
  const parameter = useSelector((state: ReduxState) =>
    state.quiz.parameters.find((parameter) => parameter.id === answer.parameterId)
  );
  const correct = question.parameters.find((parameter) => parameter.id === answer.parameterId);

  if (!correct)
    return (
      <>
        <Table.Cell>
          <DetailText color="red">
            <Icon name="close" color="red" /> {parameter.name}
          </DetailText>
        </Table.Cell>
        <Table.Cell></Table.Cell>
        <Table.Cell>
          <DetailText>0</DetailText>
        </Table.Cell>
      </>
    );
  return (
    <>
      <Table.Cell>
        <DetailText color={answer.giveUp ? 'orange' : 'green'}>
          <Icon
            name={answer.giveUp ? 'question' : 'checkmark'}
            color={answer.giveUp ? 'orange' : 'green'}
          />{' '}
          {correct.name}
        </DetailText>
      </Table.Cell>
      <Table.Cell>
        <DetailText>{correct.value}</DetailText>
      </Table.Cell>
      <Table.Cell>
        <DetailText>{answer.giveUp ? `${correct.point} point mistet` : correct.point}</DetailText>
      </Table.Cell>
    </>
  );
};

export default Answer;
