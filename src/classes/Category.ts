import Parameter from './Parameter';
import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';

interface Category {
  id: string;
  name: string;
  iconName: string;
  parameters: [Parameter];
}

class Category {
  static fragment = gql`
    fragment Category on Category {
      id
      name
      iconName
      parameters {
        id
        name
      }
    }
  `;

  static fetchAll = async () => {
    const query = gql`
      query {
        categories {
          ...Category
        }
      }
      ${Category.fragment}
    `;

    const categories = await Apollo.query<Category[]>('categories', query);
    store.dispatch(quizReducer.actions.setCategories(categories));
  };
}

export default Category;
