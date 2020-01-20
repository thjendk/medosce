import React, { useEffect } from 'react';
import User from 'classes/User';
import { useHistory } from 'react-router-dom';

export interface LogoutProps {}

const Logout: React.FC<LogoutProps> = () => {
  const history = useHistory();

  useEffect(() => {
    const logout = async () => {
      await User.logout();
      history.push('/login');
    };
    logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Logout;
