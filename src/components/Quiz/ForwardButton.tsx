import React from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Station from 'classes/Station';

export interface ForwardButtonProps {
  handleForwards: Function;
  index: number;
}

const ForwardButton: React.SFC<ForwardButtonProps> = ({ handleForwards, index }) => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const stations = useSelector((state: ReduxState) => state.quiz.items);
  const { station, questionIndex } = stations[stationIndex];
  const questions = station.questions;
  const question = questions[index];

  if (stationIndex + 1 === stations.length && question.questionNumber === questions.length)
    return null;
  if (question.questionNumber === questions.length)
    return (
      <Button
        fluid
        color="green"
        basic
        onClick={() => Station.changeStationIndex(stationIndex + 1)}
      >
        Næste station
      </Button>
    );
  return (
    <Button
      fluid
      color="blue"
      basic
      onClick={() => handleForwards()}
      disabled={questionIndex > index}
    >
      Videre
    </Button>
  );
};

export default ForwardButton;
