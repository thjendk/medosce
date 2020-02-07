import React, { useEffect } from 'react';
import { EuiText } from '@elastic/eui';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Question from 'classes/Question';

export interface QuestionCountProps {}

const QuestionCount: React.SFC<QuestionCountProps> = () => {
  const questionCount = useSelector((state: ReduxState) => state.selection.questionCount);
  const parameterCount = useSelector((state: ReduxState) => state.selection.parameterCount);

  useEffect(() => {
    Question.fetchCounts();
  });

  return (
    <EuiText style={{ textAlign: 'center', margin: '1em' }}>
      <p>
        Vi har lige nu {questionCount} spørgsmål og {parameterCount} parametre.
      </p>
    </EuiText>
  );
};

export default QuestionCount;
