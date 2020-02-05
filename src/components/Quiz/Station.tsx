import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Segment, Loader } from 'semantic-ui-react';
import { QuestionText } from 'styles/layout';
import Question from './Question';
export const QuestionIdContext = createContext<number | null>(null);

export interface StationProps {}

const Station: React.SFC<StationProps> = () => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const item = useSelector((state: ReduxState) => state.quiz.quizItems[stationIndex]);

  if (!item) return <Loader />;
  const { station } = item;
  return (
    <div>
      <Segment>
        <QuestionText>{station.intro}</QuestionText>
      </Segment>
      {station.questions.map((question, i) => (
        <QuestionIdContext.Provider value={question.id}>
          {i <= item.questionIndex && <Question />}
        </QuestionIdContext.Provider>
      ))}
    </div>
  );
};

export default Station;
