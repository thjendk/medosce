import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import quizReducer from 'redux/reducers/quiz';
import Question from './Question';
import ExamSet from './ExamSet';
import adminReducer from 'redux/reducers/admin';
import Parameter from './Parameter';

interface Station {
  id: number;
  intro: string;
  globalScore: number;
  stationNumber: number;
  examSet: ExamSet;
  questions: [Question];
}

export interface StationInput {
  intro: string;
  globalScore: number;
  stationNumber: number;
  examSetId: number;
}

class Station {
  static fragment = gql`
    fragment Station on Station {
      id
      globalScore
      stationNumber
      intro
      examSet {
        id
      }
    }
  `;

  static fetchAll = async () => {
    const query = gql`
      query {
        stations {
          ...Station
        }
      }
      ${Station.fragment}
    `;

    const stations = await Apollo.query<Station[]>('stations', query);
    store.dispatch(adminReducer.actions.setStations(stations));
  };

  static fetchQuiz = async () => {
    const query = gql`
      query {
        stations {
          ...Station
          questions {
            ...Question
          }
        }
      }
      ${Station.fragment}
      ${Question.fragment}
    `;

    const stations = await Apollo.query<Station[]>('stations', query);
    store.dispatch(quizReducer.actions.setStations(stations));
  };

  static changeStationIndex = async (index: number) => {
    store.dispatch(quizReducer.actions.setStationIndex(index));
  };

  static create = async (data: StationInput) => {
    const mutation = gql`
      mutation($data: StationInput) {
        createStation(data: $data) {
          ...Station
        }
      }
      ${Station.fragment}
    `;

    const station = await Apollo.mutate<Station>('createStation', mutation, { data });
    store.dispatch(adminReducer.actions.addStation(station));
  };
}

export default Station;
