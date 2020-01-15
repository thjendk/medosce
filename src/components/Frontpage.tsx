import React from 'react';
import { CenterText } from 'styles/text';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  const history = useHistory();

  return (
    <CenterText>
      <Button fluid basic color="blue" onClick={() => history.push('/quiz')}>
        Demo
      </Button>
    </CenterText>
  );
};

export default Frontpage;
