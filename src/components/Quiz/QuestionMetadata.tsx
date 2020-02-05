import React from 'react';
import { Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface QuestionMetadataProps {}

const QuestionMetadata: React.SFC<QuestionMetadataProps> = () => {
  const items = useSelector((state: ReduxState) => state.quiz.quizItems);
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const station = items[stationIndex].station;

  return (
    <div>
      <p>
        Sæt: {station.examSet.season}
        {station.examSet.year}
      </p>
      <Menu size="small">
        <Menu.Menu>
          <Menu.Item>Kommentarer</Menu.Item>
          <Menu.Item>Private Kommentarer</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default QuestionMetadata;
