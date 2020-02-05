import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { List, Card } from 'semantic-ui-react';

export interface StationSummaryProps {}

const StationSummary: React.SFC<StationSummaryProps> = () => {
  const items = useSelector((state: ReduxState) => state.quiz.quizItems);

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Stationer</Card.Header>
        <Card.Description>
          <List ordered>
            {items.map((item, i) => (
              <List.Item style={{ color: '#4183c4' }}>
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
