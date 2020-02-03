import AdminExamSetDetails from '../components/admin/AdminExamSetDetails';
import StationDetails from '../components/admin/StationDetails';
import QuestionDetails from '../components/admin/QuestionDetails';
import AdminExamSet from '../components/admin/AdminExamSet';
import AdminParameters from 'components/admin/AdminParameters';
import AdminCategories from 'components/admin/AdminCategories';

class Routes {
  static admin = {
    path: '/admin',
    component: AdminExamSet
  };

  static adminParameters = {
    path: Routes.admin.path + '/parameters',
    component: AdminParameters
  };

  static adminCategories = {
    path: Routes.admin.path + '/categories',
    component: AdminCategories
  };

  static adminExamSet = {
    path: Routes.admin.path + '/examset/:examSetId',
    dynamicPath: (id: number) => `/examset/${id}`,
    component: AdminExamSetDetails
  };

  static adminStation = {
    path: Routes.adminExamSet.path + '/station/:stationId',
    dynamicPath: (id: number) => `/station/${id}`,
    component: StationDetails
  };

  static adminQuestion = {
    path: Routes.adminStation.path + '/question/:questionId',
    dynamicPath: (id: number) => `/question/${id}`,
    component: QuestionDetails
  };

  static adminRoutes = [
    Routes.adminQuestion,
    Routes.adminStation,
    Routes.adminExamSet,
    Routes.adminParameters,
    Routes.adminCategories,
    Routes.admin
  ];
}

export default Routes;
