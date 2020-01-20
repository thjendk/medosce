import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Paragraph } from 'styles/text';
import _ from 'lodash';

export interface StationPointsProps {}

const StationPoints: React.SFC<StationPointsProps> = () => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const item = useSelector((state: ReduxState) => state.quiz.items[stationIndex]);
  const answers = useSelector((state: ReduxState) =>
    state.quiz.parameterAnswers.filter((answer) => answer.stationId === item.station.id)
  );

  const correct = answers.filter((answer) => !answer.giveUp);
  const gaveUp = answers.filter((answer) => answer.giveUp);

  const correctPoints =
    _.sumBy(
      correct,
      (answer) =>
        item.station.questions
          .find((question) => question.id === answer.questionId)
          .parameters.find(
            (questionParameter) => questionParameter.parameter.id === answer.parameterId
          )?.point
    ) || 0;
  const gaveUpPoints =
    _.sumBy(
      gaveUp,
      (answer) =>
        item.station.questions
          .find((question) => question.id === answer.questionId)
          .parameters.find(
            (questionParameter) => questionParameter.parameter.id === answer.parameterId
          )?.point
    ) || 0;

  return (
    <div>
      <Paragraph color="green">Point: {correctPoints}</Paragraph>
      <br />
      <Paragraph color="red">Mistede point: {gaveUpPoints}</Paragraph>
    </div>
  );
};

export default StationPoints;
