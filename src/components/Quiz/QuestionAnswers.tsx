import React, { useState, useContext } from 'react';
import { Divider, Button, Icon, Popup } from 'semantic-ui-react';
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
import Parameter from 'classes/Parameter';
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
  const userVotes = question.answers.flatMap((answer) => answer.votes);

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

  const handleVote = async (parameterId, questionAnswerId, vote) => {
    await Parameter.vote({ parameterId, questionAnswerId, vote });
  };

  const getParentParameterName = (parentId: number) => {
    if (!parentId) return '';
    const parameter = parameters.find((parameter) => parameter.id === parentId);
    return `${getParentParameterName(parameter.parent.id) + parameter.name.toTitleCase()} ➜ `;
  };

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
      name: 'Parameters',
      render: (item: QuestionAnswer) => (
        <div style={{ textAlign: 'left' }}>
          {item.parameters.map((parameter) => {
            const votes = userVotes.filter(
              (vote) => vote.parameter.id === parameter.id && item.id === vote.questionAnswer.id
            );
            const isUpVoted = votes.find((vote) => vote.user.id === user.id)?.vote === 1;
            const isDownVoted = votes.find((vote) => vote.user.id === user.id)?.vote === -1;
            const voteSum = votes.reduce((sum, vote) => (sum += vote.vote), 0);

            return (
              <Popup
                size="mini"
                position="top center"
                trigger={
                  <Tag style={{ marginTop: '5px' }}>
                    {parameter.name.toTitleCase()}
                    {user && (
                      <>
                        {' '}
                        <Icon
                          disabled={isUpVoted}
                          style={{ cursor: 'pointer', color: isUpVoted ? 'green' : null }}
                          onClick={() => handleVote(parameter.id, item.id, 1)}
                          name="arrow up"
                        />
                        <Icon
                          disabled={isDownVoted}
                          style={{ cursor: 'pointer', color: isDownVoted ? 'red' : null }}
                          onClick={() => handleVote(parameter.id, item.id, -1)}
                          name="arrow down"
                        />
                      </>
                    )}
                    {voteSum}
                  </Tag>
                }
              >
                {getParentParameterName(parameter.parent.id) + parameter.name.toTitleCase()}
              </Popup>
            );
          })}
          {user && <QuestionVoteParameterDropdown answerId={item.id} />}
        </div>
      )
    },
    {
      name: 'Description',
      render: (item) => (
        <div>
          <pre style={{ textAlign: 'left' }}>{item.value}</pre>
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
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px' }}>Du mangler {missingAnswersCount} værdier.</p>
        <Divider />
        {correct.length > 0 && (
          <EuiInMemoryTable tableLayout="auto" columns={columns} items={correct} />
        )}
        <StyledDivider small />
        <Button size="tiny" basic onClick={() => setShowMissing(!showMissing)}>
          {showMissing ? 'Skjul' : 'Vis'} manglende
        </Button>
        {showMissing && (
          <EuiInMemoryTable tableLayout="auto" columns={columns} items={missingAnswers} />
        )}
        <Divider />
      </div>
      Giver ikke point:{' '}
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
