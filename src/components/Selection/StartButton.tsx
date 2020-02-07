import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export interface StartButtonProps {}

const StartButton: React.SFC<StartButtonProps> = () => {
  const history = useHistory();

  return (
    <Button fluid basic color="green" onClick={() => history.push('/quiz')}>
      Start
    </Button>
  );
};

export default StartButton;
