import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteComponentProps, useLocation } from 'react-router';
import { ReduxState } from 'redux/reducers';

export interface ProtectedRouteProps {
  path: string;
  component: React.FunctionComponent<RouteComponentProps>;
}

const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({ path, component: Component }) => {
  const location = useLocation();
  const user = useSelector((state: ReduxState) => state.auth.user);

  return (
    <Route
      path={path}
      render={(routeProps) => {
        if (!user || user.role.id !== '1') {
          // Not Admin, or not logged in
          return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />;
        }
        return <Component {...routeProps} />;
      }}
    />
  );
};

export default ProtectedRoute;
