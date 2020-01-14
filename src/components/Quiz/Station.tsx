import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Segment, Loader, Button, Divider } from 'semantic-ui-react';
import { QuestionText } from 'styles/layout';
import Question from './Question';
import QuestionClass from 'classes/Question';

export interface StationProps {}

const Station: React.SFC<StationProps> = () => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const item = useSelector((state: ReduxState) => state.quiz.items[stationIndex]);
  if (!item) return <Loader />;
  const { station, questionIndex } = item;

  const handleNextQuestion = () => {
    QuestionClass.nextQuestion(station.id);
  };

  return (
    <div>
      <Segment>
        <QuestionText>{station.intro}</QuestionText>
        <Divider hidden />
        <Button fluid onClick={handleNextQuestion} basic color="blue">
          Start
        </Button>
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
