import React, { useEffect, useState } from 'react';
import Station from './Station';
import StationClass from 'classes/Station';
import Parameter from 'classes/Parameter';
import QuizNavigator from './QuizNavigator';
import StationPoints from './StationPoints';
import { Segment } from 'semantic-ui-react';
import QuestionMetadata from './QuestionMetadata';
import StationSummary from './StationSummary';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { EuiTitle } from '@elastic/eui';
import LoadingPage from 'components/misc/LoadingPage';

export interface QuizProps {}

const Quiz: React.SFC<QuizProps> = () => {
  const [loading, setLoading] = useState(true);
  const stations = useSelector((state: ReduxState) => state.quiz.quizItems);

  useEffect(() => {
    const fetchQuiz = async () => {
      await StationClass.fetchQuiz();
      await Parameter.fetchAll();
      setLoading(false);
    };

    fetchQuiz();
  }, []);

  if (loading) return <LoadingPage />;
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

      <QuizNavigator />
      <StationSummary />
    </div>
  );
};

export default Quiz;
