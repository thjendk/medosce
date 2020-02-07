import React, { useState, useContext } from 'react';
import { Divider, Button, Icon } from 'semantic-ui-react';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { EuiInMemoryTable, EuiTextArea } from '@elastic/eui';
import QuestionMeta from './QuestionMeta';
import { Tag } from 'antd';
import { StyledDivider } from 'styles/layout';
import QuestionVoteParameterDropdown from './QuestionVoteParameterDropdown';
import { QuestionIdContext } from './Station';
import TextAnswer from 'classes/TextAnswer';
import UserAnswer from 'classes/UserAnswer';
import Question, { QuestionAnswer } from 'classes/Question';
import Station from 'classes/Station';
import 'antd/es/tag/style/css';

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
  const userVotes = question.answers.flatMap((answer) =>
    answer.votes.filter((vote) => vote.user.id === user.id)
  );

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

  const columns = [
    {
      name: 'Parameters',
      render: (item: QuestionAnswer) => (
        <div style={{ textAlign: 'left' }}>
          {item.parameters.map((parameter) => {
            const votes = userVotes.filter(
              (vote) => vote.parameter.id === parameter.id && item.id === vote.questionAnswer.id
            );
            const isUpVoted = votes.find((vote) => vote.user.id === user.id)?.vote === 1;
            const isDownVoted = votes.find((vote) => vote.user.id === user.id)?.vote === -1;

            return (
              <Tag>
                {parameter.name.toTitleCase()}
                {user && (
                  <>
                    {' '}
                    <Icon
                      style={{ cursor: 'pointer', color: isUpVoted ? 'green' : null }}
                      onClick={() => {}}
                      name="arrow up"
                    />
                    <Icon
                      style={{ cursor: 'pointer', color: isDownVoted ? 'red' : null }}
                      onClick={() => {}}
                      name="arrow down"
                    />
                  </>
                )}
                {votes.length}
              </Tag>
            );
          })}
          <QuestionVoteParameterDropdown answerId={item.id} />
        </div>
      )
    },
    {
      name: 'Description',
      render: (item) => <p style={{ textAlign: 'left' }}>{item.value}</p>
    },
    {
      name: 'Points',
      field: 'point'
    }
  ];

  const handleNextQuestion = () => {
    TextAnswer.answer({ questionId: question.id, text });
    UserAnswer.submitAnswers();
    Question.nextQuestion(station.id);
  };

  const handleNextStation = () => {
    Station.changeStationIndex(stationIndex + 1);
  };

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
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px' }}>Du mangler {missingAnswersCount} værdier.</p>
        <Divider />
        {correct.length > 0 && <EuiInMemoryTable columns={columns} items={correct} />}
        <StyledDivider small />
        <Button
          disabled={missingAnswers.length < 1 && !showMissing}
          size="tiny"
          basic
          onClick={() => setShowMissing(!showMissing)}
        >
          {showMissing ? 'Hide' : 'Show'} missing
        </Button>
        {showMissing && <EuiInMemoryTable columns={columns} items={missingAnswers} />}
        <Divider />
      </div>
      Forkerte:{' '}
      {wrong.map((answer) => (
        <Tag color="red">
          {parameters.find((parameter) => parameter.id === answer.parameterId).name.toTitleCase()}
        </Tag>
      ))}
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
