import Parameter from 'classes/Parameter';
import { QuestionAnswer } from 'classes/Question';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Icon } from 'semantic-ui-react';

import { QuestionIdContext } from './Station';

export interface ParameterTagVotingProps {
  parameter: Parameter;
  answer: QuestionAnswer;
}

const ParameterTagVoting: React.SFC<ParameterTagVotingProps> = ({ parameter, answer }) => {
  const questionId = useContext(QuestionIdContext);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );
  const userVotes = question.answers.flatMap((answer) => answer.votes);

  // Calculates votes
  const votes = userVotes.filter(
    (vote) => vote.parameter.id === parameter.id && answer.id === vote.questionAnswer.id
  );
  const isUpVoted = user ? votes.find((vote) => vote.user.id === user.id)?.vote === 1 : false;
  const isDownVoted = user ? votes.find((vote) => vote.user.id === user.id)?.vote === -1 : false;
  const voteSum = votes.reduce((sum, vote) => (sum += vote.vote), 0);

  /**
   * Handles voting on a parameter
   * @param parameterId
   * @param questionAnswerId
   * @param vote is either 1 or -1
   */
  const handleVote = async (parameterId: number, questionAnswerId: number, vote: number) => {
    await Parameter.vote({ parameterId, questionAnswerId, vote });
  };

  return (
    <>
      {' '}
      <Icon
        disabled={isUpVoted}
        style={{ cursor: 'pointer', color: isUpVoted ? 'green' : null }}
        onClick={() => handleVote(parameter.id, answer.id, 1)}
        name="arrow up"
      />
      <Icon
        disabled={isDownVoted}
        style={{ cursor: 'pointer', color: isDownVoted ? 'red' : null }}
        onClick={() => handleVote(parameter.id, answer.id, -1)}
        name="arrow down"
      />
      {voteSum}
    </>
  );
};

export default ParameterTagVoting;
