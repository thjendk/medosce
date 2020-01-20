import React, { useEffect, useState } from 'react';
import Station from './Station';
import StationClass from 'classes/Station';
import Category from 'classes/Category';
import Parameter from 'classes/Parameter';
import QuizNavigator from './QuizNavigator';
import StationPoints from './StationPoints';
import { Segment } from 'semantic-ui-react';
import QuestionMetadata from './QuestionMetadata';
import StationSummary from './StationSummary';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiTitle } from '@elastic/eui';

export interface QuizProps {}

const Quiz: React.SFC<QuizProps> = () => {
  const [loading, setLoading] = useState(true);
  const stations = useSelector((state: ReduxState) => state.quiz.items);

  useEffect(() => {
    const fetchQuiz = async () => {
      await StationClass.fetchQuiz();
      await Category.fetchAll();
      await Parameter.fetchAll();
      setLoading(false);
    };

    fetchQuiz();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (stations.length === 0)
    return (
      <EuiTitle>
        <h1>There are no stations based on your wishes</h1>
      </EuiTitle>
    );
  return (
    <div>
      <QuizNavigator />
      <Station />
      <Segment>
        <StationPoints />
        <QuestionMetadata />
      </Segment>

      <StationSummary />
    </div>
  );
};

export default Quiz;
