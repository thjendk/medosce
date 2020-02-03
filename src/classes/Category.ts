import Parameter from './Parameter';
import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import QuestionType from './QuestionType';

interface Category {
  id: number;
  name: string;
  iconName: string;
  parameters: Parameter[];
  questionTypes: QuestionType[];
  parent: Category;
}

export interface CategoryInput {
  name: string;
  iconName: string;
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
      parent {
        id
      }
      questionTypes {
        ...QuestionType
      }
    }
    ${QuestionType.fragment}
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

  static create = async (data: CategoryInput) => {
    const mutation = gql`
      mutation($data: CategoryInput) {
        createCategory(data: $data) {
          ...Category
        }
      }
      ${Category.fragment}
    `;

    const category = await Apollo.mutate<Category>('createCategory', mutation, { data });
    return store.dispatch(quizReducer.actions.addCategory(category));
  };
}

export default Category;
