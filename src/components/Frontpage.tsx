import React from 'react';
import { LargeText, CenterText } from 'styles/text';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  const history = useHistory();

  return (
    <CenterText>
      <Button fluid basic color="blue" onClick={() => history.push('/demo')}>
        Demo
      </Button>
    </CenterText>
  );
};

export default Frontpage;
