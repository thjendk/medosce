import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Station from 'classes/Station';

export interface QuizNavigatorProps {}

const QuizNavigator: React.SFC<QuizNavigatorProps> = () => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const items = useSelector((state: ReduxState) => state.quiz.items);

  const handleNavigation = (step: number) => {
    const newIndex = stationIndex + step;
    Station.changeStationIndex(newIndex);
  };

  return (
    <Menu widths={3} fluid>
      <Menu.Item disabled={stationIndex === 0} onClick={() => handleNavigation(-1)}>
        <Icon name="step backward" /> Forrige
      </Menu.Item>
      <Menu.Item>Station {stationIndex + 1}</Menu.Item>
      <Menu.Item disabled={stationIndex === items.length - 1} onClick={() => handleNavigation(+1)}>
        <Icon name="step forward" />
        Næste
      </Menu.Item>
    </Menu>
  );
};

export default QuizNavigator;
