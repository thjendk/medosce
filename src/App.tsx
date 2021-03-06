import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Frontpage from './components/Frontpage';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import Layout from 'components/layout/Layout';
import User from 'classes/User';
import Quiz from 'components/Quiz/Quiz';
import './App.scss';
import ProtectedRoute from 'components/auth/ProtectedRoute';
import Admin from 'components/admin/Admin';

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  useEffect(() => {
    const fetchUser = async () => {
      await User.fetch();
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Layout>
        <Switch>
          <ProtectedRoute path="/admin" component={Admin} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/" component={Frontpage} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
