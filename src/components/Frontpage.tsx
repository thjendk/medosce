import React from 'react';
import Selection from './Selection/Selection';
import { Divider } from 'semantic-ui-react';
import { CenterText } from 'styles/text';
import StartButton from './Selection/StartButton';
import QuestionCount from './Selection/QuestionCount';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <div>
      <CenterText>
        <h1 style={{ color: '#004687', fontSize: '3em', fontWeight: 'bold' }}>MedOSCE</h1>
      </CenterText>
      <Divider />
      <QuestionCount />
      <Selection />
      <Divider />
      <StartButton />
    </div>
  );
};

export default Frontpage;
