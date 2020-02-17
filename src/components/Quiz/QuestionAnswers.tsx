import 'antd/es/tag/style/css';

import Question, { QuestionAnswer } from 'classes/Question';
import Station from 'classes/Station';
import TextAnswer from 'classes/TextAnswer';
import UserAnswer from 'classes/UserAnswer';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Button, Divider } from 'semantic-ui-react';

import { EuiInMemoryTable, EuiTextArea } from '@elastic/eui';

import ParameterTag from './ParameterTag';
import QuestionMeta from './QuestionMeta';
import QuestionVoteParameterDropdown from './QuestionVoteParameterDropdown';
import { QuestionIdContext } from './Station';

export interface QuestionAnswersProps {}

const QuestionAnswers: React.SFC<QuestionAnswersProps> = () => {
  const [text, setText] = useState('');
  const [showMissing, setShowMissing] = useState(false);
  const questionId = useContext(QuestionIdContext);
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const quizItems = useSelector((state: ReduxState) => state.quiz.quizItems);
  const { station, questionIndex } = quizItems[stationIndex];
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );
  const currentQuestionIndex = station.questions.findIndex(
    (stationQuestion) => stationQuestion.id === question.id
  );
  const userAnswers = useSelector((state: ReduxState) =>
    state.quiz.userAnswers.filter((answer) => answer.questionId === question.id)
  );
  const userAnswerParameterIds = userAnswers.map((userAnswer) => userAnswer.parameterId);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const correct = question.answers.filter((questionAnswer) =>
    userAnswers.some((userAnswer) =>
      questionAnswer.parameters.some((parameter) => userAnswer.parameterId === parameter.id)
    )
  );
  const wrong = userAnswers.filter((userAnswer) =>
    question.answers.every((answer) =>
      answer.parameters.every((parameter) => parameter.id !== userAnswer.parameterId)
    )
  );

  const missingAnswers = question.answers.filter(
    (answer) =>
      !answer.parameters.some((parameter) => userAnswerParameterIds.includes(parameter.id))
  );
  const missingAnswersCount = missingAnswers.length;

  const handleNextQuestion = () => {
    TextAnswer.answer({ questionId: question.id, text });
    UserAnswer.submitAnswers();
    Question.nextQuestion(station.id);
  };

  const handleNextStation = () => {
    Station.changeStationIndex(stationIndex + 1);
  };

  const columns = [
    {
      name: 'Parameter',
      render: (item: QuestionAnswer) => (
        <div style={{ textAlign: 'left' }}>
          {item.parameters.map((parameter) => (
            <ParameterTag answer={item} parameter={parameter} />
          ))}
          {user && <QuestionVoteParameterDropdown answerId={item.id} />}
        </div>
      )
    },
    {
      name: 'Description',
      render: (item) => (
        <div>
          <pre style={{ textAlign: 'left' }}>{item.value.toTitleCase()}</pre>
        </div>
      )
    },
    {
      name: 'Points',
      field: 'point'
    }
  ];

  return (
    <div>
      <EuiTextArea
        placeholder="Overvejelser..."
        fullWidth
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={missingAnswersCount === 0 || questionIndex > currentQuestionIndex}
      />
      <QuestionMeta />
      <Divider />
      <div style={{ textAlign: 'center' }}>
        {correct.length > 0 && (
          <>
            <EuiInMemoryTable tableLayout="auto" columns={columns} items={correct} />
            <Divider hidden />
          </>
        )}
        {(missingAnswersCount > 0 || showMissing) && (
          <Button size="tiny" basic onClick={() => setShowMissing(!showMissing)}>
            {showMissing ? 'Skjul' : 'Vis'} manglende ({missingAnswersCount})
          </Button>
        )}
        {showMissing && (
          <EuiInMemoryTable tableLayout="auto" columns={columns} items={missingAnswers} />
        )}
        <Divider hidden />
      </div>
      Giver ikke point:{' '}
      {wrong.map((answer) => {
        const parameter = parameters.find((parameter) => parameter.id === answer.parameterId);
        if (!parameter) return null;
        return <ParameterTag parameter={parameter} error />;
      })}
      <Divider />
      {questionIndex === currentQuestionIndex &&
        station.questions.length - 1 > currentQuestionIndex && (
          <Button onClick={handleNextQuestion} color="blue" basic={missingAnswersCount !== 0} fluid>
            Continue
          </Button>
        )}
      {station.questions.length - 1 === currentQuestionIndex &&
        quizItems.length - 1 > stationIndex && (
          <Button onClick={handleNextStation} fluid basic={missingAnswersCount !== 0} color="green">
            Next station
          </Button>
        )}
    </div>
  );
};

export default QuestionAnswers;
