import React from 'react';

import { Loader } from 'semantic-ui-react';
import { StyledPageCenterer } from 'styles/layout';

export interface LoadingPageProps {}

const LoadingPage: React.SFC<LoadingPageProps> = () => {
  return (
    <StyledPageCenterer>
      <Loader inline size="huge" active />
    </StyledPageCenterer>
  );
};

export default LoadingPage;
