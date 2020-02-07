import React from 'react';
import { EuiText } from '@elastic/eui';
import { Radio } from 'semantic-ui-react';

export interface SelectionRandomProps {}

const SelectionRandom: React.SFC<SelectionRandomProps> = () => {
  return (
    <div style={{ display: 'flex' }}>
      <EuiText style={{ marginRight: '2rem' }}>
        <p>Hvor mange spørgsmål vil du have?</p>
      </EuiText>
      <Radio label="Alle" checked />
    </div>
  );
};

export default SelectionRandom;
