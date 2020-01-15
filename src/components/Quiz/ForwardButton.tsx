import React from 'react';
import { Button } from 'semantic-ui-react';
import Question from 'classes/Question';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface ForwardButtonProps {
  question: Question;
}

const ForwardButton: React.SFC<ForwardButtonProps> = ({ question }) => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const item = useSelector((state: ReduxState) => state.quiz.items[stationIndex]);
  const { station } = item;
  const questions = station.questions;

  if (question.questionNumber === questions.length)
    return (
      <Button fluid color="green" basic>
        Næste station
      </Button>
    );
  return (
    <Button fluid color="blue" basic onClick={() => Question.nextQuestion(station.id)}>
      Videre
    </Button>
  );
};

export default ForwardButton;
