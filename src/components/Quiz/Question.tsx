import React from 'react';
import { QuestionText } from 'styles/layout';
import QuestionClass from 'classes/Question';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { Segment, Label, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import UserAnswer from 'classes/UserAnswer';
import QuestionAnswers from './QuestionAnswers';
import 'antd/lib/dropdown/style/css';
import 'antd/lib/menu/style/css';
import Station from 'classes/Station';

export interface QuestionProps {
  question: QuestionClass;
  station: Station;
}

const Question: React.SFC<QuestionProps> = ({ question, station }) => {
  const categories = useSelector((state: ReduxState) => state.quiz.categories);
  const answers = useSelector((state: ReduxState) =>
    state.quiz.answers.filter((answer) => answer.questionId === question.id)
  );
  const answerParameterIds = answers.map((answer) => answer.parameterId);

  const handleAnswer = (data: UserAnswer) => {
    // TODO: Svar til databasen
    QuestionClass.answer(data);
  };

  return (
    <Segment>
      <QuestionText>{question.text}</QuestionText>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        {categories.map((category) => (
          <Dropdown
            overlay={
              <Menu>
                {category.parameters
                  .filter((parameter) => !answerParameterIds.includes(parameter.id))
                  .map((parameter) => (
                    <Menu.Item
                      onClick={() =>
                        handleAnswer({
                          questionId: question.id,
                          parameterId: parameter.id,
                          giveUp: false,
                          stationId: station.id
                        })
                      }
                    >
                      {parameter.name}
                    </Menu.Item>
                  ))}
              </Menu>
            }
          >
            <Label style={{ cursor: 'pointer', margin: '5px auto' }} basic>
              {category.name}
            </Label>
          </Dropdown>
        ))}
      </div>

      <Divider hidden />

      <QuestionAnswers question={question} station={station} />
    </Segment>
  );
};

export default Question;
