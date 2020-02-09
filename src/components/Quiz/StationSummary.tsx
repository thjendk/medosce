import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { List, Card } from 'semantic-ui-react';
import Station from 'classes/Station';

export interface StationSummaryProps {}

const StationSummary: React.SFC<StationSummaryProps> = () => {
  const items = useSelector((state: ReduxState) => state.quiz.quizItems);
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);

  const handleNavigate = (index: number) => {
    Station.changeStationIndex(index);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Stationer</Card.Header>
        <Card.Description style={{ columns: '250px 4' }}>
          <List ordered>
            {items.map((item, i) => (
              <List.Item
                onClick={() => handleNavigate(i)}
                style={{
                  color: stationIndex === i ? 'darkgreen' : '#4183c4',
                  cursor: 'pointer'
                }}
              >
                {item.station.intro.substr(0, 30)} ...
              </List.Item>
            ))}
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default StationSummary;
