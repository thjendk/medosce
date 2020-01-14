import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import Question from './Question';
import ExamSet from './ExamSet';
import Parameter from './Parameter';

interface Station {
  id: string;
  intro: string;
  globalScore: number;
  stationNumber: number;
  examSet: ExamSet;
  questions: [Question];
}

class Station {
  static fragment = gql`
    fragment Station on Station {
      id
      globalScore
      stationNumber
      examSet {
        id
        season
        year
      }
      intro
      questions {
        id
        text
        questionNumber
        parameters {
          ...Parameter
        }
      }
    }
    ${Parameter.fragment}
  `;

  static fetch = async () => {
    const query = gql`
      query {
        stations {
          ...Station
        }
      }
      ${Station.fragment}
    `;

    const stations = await Apollo.query<Station[]>('stations', query);
    store.dispatch(quizReducer.actions.setStations(stations));
  };

  static changeStationIndex = async (index: number) => {
    store.dispatch(quizReducer.actions.setStationIndex(index));
  };
}

export default Station;
