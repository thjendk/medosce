import React from 'react';
import { Menu } from 'semantic-ui-react';

export interface QuestionMetadataProps {}

const QuestionMetadata: React.SFC<QuestionMetadataProps> = () => {
  return (
    <Menu>
      <Menu.Menu>
        <Menu.Item>Kommentarer</Menu.Item>
        <Menu.Item>Private Kommentarer</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default QuestionMetadata;
