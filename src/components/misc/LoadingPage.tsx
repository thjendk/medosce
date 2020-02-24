import React, { useState, useEffect } from 'react';

import { Loader, Button, Divider } from 'semantic-ui-react';

export interface LoadingPageProps {}

const LoadingPage: React.SFC<LoadingPageProps> = () => {
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTimedOut(true);
    }, 3000);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Loader inline size="huge" active />
      <Divider hidden />
      {isTimedOut && (
        <Button onClick={() => window.location.reload()} fluid color="blue" basic>
          Det ser ud til at serveren ikke svarer. Tryk her for at prøve igen
        </Button>
      )}
    </div>
  );
};

export default LoadingPage;
