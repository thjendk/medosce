import React, { useEffect } from 'react';
import Station from './Station';
import StationClass from 'classes/Station';
import Category from 'classes/Category';
import Parameter from 'classes/Parameter';
import QuizNavigator from './QuizNavigator';
import StationPoints from './StationPoints';
import { Segment } from 'semantic-ui-react';
import QuestionMetadata from './QuestionMetadata';
import StationSummary from './StationSummary';

export interface QuizProps {}

const Quiz: React.SFC<QuizProps> = () => {
  useEffect(() => {
    StationClass.fetch();
    Category.fetchAll();
    Parameter.fetchAll();
  }, []);

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
