import React from 'react';
import { QuestionText } from 'styles/layout';
import { Segment, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import QuestionAnswers from './QuestionAnswers';
import QuestionToolbox from './QuestionToolbox';

export interface QuestionProps {
  index: number;
}

const Question: React.SFC<QuestionProps> = ({ index }) => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const { station, questionIndex } = useSelector(
    (state: ReduxState) => state.quiz.items[stationIndex]
  );
  const question = station.questions[index];

  if (index > questionIndex) return null;
  return (
    <Segment>
      <QuestionText>{question.text}</QuestionText>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <QuestionToolbox index={index} />
        <div style={{ width: '70%', flex: '1' }}>
          <QuestionAnswers index={index} />
        </div>
      </div>
    </Segment>
  );
};

export default Question;
