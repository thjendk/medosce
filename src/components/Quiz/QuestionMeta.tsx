import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Settings from 'classes/Settings';
import { Menu } from 'semantic-ui-react';

export interface QuestionMetaProps {}

const QuestionMeta: React.SFC<QuestionMetaProps> = () => {
  const showToolbox = useSelector((state: ReduxState) => state.settings.showToolbox);

  return (
    <Menu size="tiny">
      <Menu.Item>Egne tidligere besvarelser (count)</Menu.Item>
      <Menu.Item>Offentlige besvarelser (count)</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => Settings.toggleToolbox()}>
          {showToolbox ? 'Skjul toolbox' : 'Vis toolbox'}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default QuestionMeta;
