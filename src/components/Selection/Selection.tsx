import React, { useState } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import SelectionRandom from './SelectionRandom';
import SelectionParameters from './SelectionParameters';
import SelectionSets from './SelectionSets';

export interface SelectionProps {}

const Selection: React.SFC<SelectionProps> = () => {
  const [selected, setSelection] = useState(0);

  return (
    <div>
      <Button.Group fluid widths="3">
        <Button active={selected === 0} onClick={() => setSelection(0)}>
          Tilfældige spørgsmål
        </Button>
        <Button active={selected === 1} onClick={() => setSelection(1)}>
          Parametre
        </Button>
        <Button active={selected === 2} onClick={() => setSelection(2)}>
          Sæt
        </Button>
      </Button.Group>
      <Divider hidden />
      {selected === 0 && <SelectionRandom />}
      {selected === 1 && <SelectionParameters />}
      {selected === 2 && <SelectionSets />}
    </div>
  );
};

export default Selection;
