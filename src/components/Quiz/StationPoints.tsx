import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Paragraph } from 'styles/text';
import _ from 'lodash';

export interface StationPointsProps {}

const StationPoints: React.SFC<StationPointsProps> = () => {
  // const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  // const item = useSelector((state: ReduxState) => state.quiz.quizItem[stationIndex]);
  // const answers = useSelector((state: ReduxState) =>
  //   state.quiz.userAnswers.filter((answer) => answer.stationId === item.station.id)
  // );

  // const correct = answers.filter((answer) => !answer.parameterId);
  // const gaveUp = answers.filter((answer) => answer.parameterId);

  // TODO
  return null;

  // const correctPoints =
  //   _.sumBy(
  //     correct,
  //     (answer) =>
  //       item.station.questions
  //         .find((question) => question.id === answer.questionId)
  //         .answers.find((answer) => answer.parameter.id === answer.parameterId)?.point
  //   ) || 0;
  // const gaveUpPoints =
  //   _.sumBy(
  //     gaveUp,
  //     (answer) =>
  //       item.station.questions
  //         .find((question) => question.id === answer.questionId)
  //         .answers.find((answer) => answer.parameter.id === answer.parameterId)?.point
  //   ) || 0;

  // return (
  //   <div>
  //     <Paragraph color="green">Point: {correctPoints}</Paragraph>
  //     <br />
  //     <Paragraph color="red">Mistede point: {gaveUpPoints}</Paragraph>
  //   </div>
  // );
};

export default StationPoints;
