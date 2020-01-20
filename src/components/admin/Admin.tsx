import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import ExamSet from 'classes/ExamSet';
import Station from 'classes/Station';
import { EuiTitle } from '@elastic/eui';
import { Divider } from 'semantic-ui-react';
import Question from 'classes/Question';
import Routes from 'classes/Routes';
import Parameter from 'classes/Parameter';
import Category from 'classes/Category';
import AdminStats from './AdminStats';
import QuestionType from 'classes/QuestionType';

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      await ExamSet.fetchAll();
      await Station.fetchAll();
      await Question.fetchAll();
      await Category.fetchAll();
      await Parameter.fetchAll();
      await QuestionType.fetchAll();
      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <AdminStats />
      <Divider />
      <Switch>
        {Routes.adminRoutes.map((route) => (
          <Route path={route.path} component={route.component} />
        ))}
      </Switch>
    </div>
  );
};

export default Admin;
