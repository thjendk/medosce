import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import adminReducer from 'redux/reducers/admin';
import Station from './Station';

interface ExamSet {
  id: string;
  season: 'E' | 'F';
  year: string;
  stations: Station[];
}

export interface ExamSetInput {
  season: 'E' | 'F';
  year: string;
}

class ExamSet {
  static fragment = gql`
    fragment ExamSet on ExamSet {
      id
      season
      year
      stations {
        ...Station
      }
    }
    ${Station.fragment}
  `;

  static fetchAll = async () => {
    const query = gql`
      query {
        examSets {
          ...ExamSet
        }
      }
      ${ExamSet.fragment}
    `;

    const examSets = await Apollo.query<ExamSet[]>('examSets', query);
    store.dispatch(adminReducer.actions.setExamSets(examSets));
  };

  static create = async (data: ExamSetInput) => {
    const mutation = gql`
      mutation($data: ExamSetInput) {
        createExamSet(data: $data) {
          ...ExamSet
        }
      }
      ${ExamSet.fragment}
    `;

    const examSet = await Apollo.mutate<ExamSet>('createExamSet', mutation, { data });
    return store.dispatch(adminReducer.actions.addExamSet(examSet));
  };
}

export default ExamSet;
