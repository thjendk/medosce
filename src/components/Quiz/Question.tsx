import React, { useContext } from 'react';
import { QuestionText } from 'styles/layout';
import { Segment, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import QuestionAnswers from './QuestionAnswers';
import QuestionToolbox from './QuestionToolbox';
import { QuestionIdContext } from './Station';

export interface QuestionProps {}

const Question: React.SFC<QuestionProps> = () => {
  const questionId = useContext(QuestionIdContext);
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );

  return (
    <Segment>
      <QuestionText>{question.text}</QuestionText>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <QuestionToolbox />
        <div style={{ width: '70%', flex: '1', margin: '0 1em' }}>
          <QuestionAnswers />
        </div>
      </div>
    </Segment>
  );
};

export default Question;
