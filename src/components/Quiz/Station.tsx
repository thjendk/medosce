import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Segment, Loader } from 'semantic-ui-react';
import { QuestionText } from 'styles/layout';
import Question from './Question';

export interface StationProps {}

const Station: React.SFC<StationProps> = () => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const item = useSelector((state: ReduxState) => state.quiz.items[stationIndex]);
  if (!item) return <Loader />;
  const { station, questionIndex } = item;

  return (
    <div>
      <Segment>
        <QuestionText>{station.intro}</QuestionText>
      </Segment>
      {station.questions.map((question) =>
        question.questionNumber <= questionIndex ? (
          <Question station={station} question={question} />
        ) : null
      )}
    </div>
  );
};

export default Station;
