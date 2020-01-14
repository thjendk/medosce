import React from 'react';
import { Table, Divider, Button } from 'semantic-ui-react';
import Question from 'classes/Question';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import Answer from './Answer';
import Station from 'classes/Station';

export interface QuestionAnswersProps {
  question: Question;
  station: Station;
}

const QuestionAnswers: React.SFC<QuestionAnswersProps> = ({ question, station }) => {
  const answers = useSelector((state: ReduxState) =>
    state.quiz.answers.filter((answer) => answer.questionId === question.id)
  );
  const answerParameterIds = answers.map((answer) => answer.parameterId);

  const missingParameters = question.parameters.filter(
    (parameter) => !answerParameterIds.includes(parameter.id)
  );
  const missingAnswers = missingParameters.length;

  const handleGiveUp = () => {
    for (let missing of missingParameters) {
      Question.answer({
        parameterId: missing.id,
        giveUp: true,
        questionId: question.id,
        stationId: station.id
      });
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <p>Du mangler {missingAnswers} værdier.</p>
      </div>

      <Table celled>
        <Table.Header>
          <Table.HeaderCell>Svar</Table.HeaderCell>
          <Table.HeaderCell>Detaljer</Table.HeaderCell>
          <Table.HeaderCell>Point</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {answers.map((answer) => (
            <Table.Row>
              <Answer question={question} answer={answer} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Divider />
      {missingAnswers !== 0 && (
        <Button onClick={handleGiveUp} fluid basic color="red">
          Giv op
        </Button>
      )}
      {missingAnswers === 0 && (
        <Button fluid color="blue" basic onClick={() => Question.nextQuestion(station.id)}>
          Videre
        </Button>
      )}
    </div>
  );
};

export default QuestionAnswers;
