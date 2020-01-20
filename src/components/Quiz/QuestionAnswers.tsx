import React from 'react';
import { Divider, Button, Icon } from 'semantic-ui-react';
import Question, { QuestionParameter } from 'classes/Question';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import Station from 'classes/Station';
import { StyledDivider } from 'styles/layout';
import ForwardButton from './ForwardButton';
import { EuiInMemoryTable } from '@elastic/eui';
import UserAnswer from 'classes/UserAnswer';
import Parameter from 'classes/Parameter';

export interface QuestionAnswersProps {
  question: Question;
  station: Station;
}

const QuestionAnswers: React.SFC<QuestionAnswersProps> = ({ question, station }) => {
  const answers = useSelector((state: ReduxState) =>
    state.quiz.answers.filter((answer) => answer.questionId === question.id)
  );
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const answerParameterIds = answers.map((answer) => answer.parameterId);
  const missingParameters = question.parameters.filter(
    (questionParameter) => !answerParameterIds.includes(questionParameter.parameter.id)
  );
  const missingAnswersCount = missingParameters.length;
  const items = answers.map((answer) => ({
    answer,
    questionParameter: question.parameters.find(
      (questionParameter) => questionParameter.parameter.id === answer.parameterId
    ),
    parameter: parameters.find((parameter) => parameter.id === answer.parameterId)
  }));

  const handleGiveUp = () => {
    for (let missing of missingParameters) {
      Question.answer({
        parameterId: missing.parameter.id,
        giveUp: true,
        questionId: question.id,
        stationId: station.id
      });
    }
  };

  const columns = [
    {
      name: 'Svar',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: UserAnswer;
      }) => {
        if (!item.questionParameter)
          return (
            <span style={{ color: 'red' }}>
              <Icon name="close" color="red" /> {item.parameter.name}
            </span>
          );
        if (item.answer.giveUp)
          return (
            <span style={{ color: 'orange' }}>
              <Icon name="question" color="orange" /> {item.parameter.name.toTitleCase()}
            </span>
          );
        return (
          <span style={{ color: 'green' }}>
            <Icon name="checkmark" color="green" /> {item.parameter.name.toTitleCase()}
          </span>
        );
      }
    },
    {
      name: 'Detaljer',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: UserAnswer;
      }) => item.questionParameter?.value
    },
    {
      name: 'Point',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: UserAnswer;
      }) => {
        if (!item.questionParameter) return 0;
        if (item.answer.giveUp) return `${item.questionParameter.point} point mistet`;
        return item.questionParameter.point;
      }
    }
  ];

  return (
    <div>
      {missingAnswersCount > 1 && (
        <div style={{ textAlign: 'center' }}>
          <p>Du mangler {missingAnswersCount} værdier.</p>
        </div>
      )}
      <Divider />
      {items.length > 0 && <EuiInMemoryTable items={items} columns={columns} />}
      <Divider hidden />
      {missingAnswersCount !== 0 && (
        <Button onClick={handleGiveUp} fluid basic color="red">
          Se manglende værdier
        </Button>
      )}
      <StyledDivider small />
      <ForwardButton question={question} />
    </div>
  );
};

export default QuestionAnswers;
