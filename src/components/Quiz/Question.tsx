import React from 'react';
import { QuestionText } from 'styles/layout';
import QuestionClass from 'classes/Question';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { Segment, Label, Divider, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import UserAnswer from 'classes/UserAnswer';
import QuestionAnswers from './QuestionAnswers';
import { EuiSelectable, EuiPopoverTitle } from '@elastic/eui';
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
  const missingParameters = question.parameters.filter(
    (parameter) => !answerParameterIds.includes(parameter.id)
  );
  const missingAnswers = missingParameters.length;

  const handleAnswer = (data: UserAnswer) => {
    // TODO: Svar til databasen
    QuestionClass.answer(data);
  };

  return (
    <Segment>
      <QuestionText>{question.text}</QuestionText>
      <Divider />
      {missingAnswers > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {categories.map((category) => (
            <Dropdown
              overlay={
                <Menu>
                  <EuiSelectable
                    searchable
                    singleSelection
                    searchProps={{
                      placeholder: 'Søg...',
                      compressed: true
                    }}
                    options={category.parameters
                      .filter((parameter) => !answerParameterIds.includes(parameter.id))
                      .map((parameter) => ({
                        label: parameter.name.toTitleCase(),
                        key: parameter.id,
                        onClick: () =>
                          handleAnswer({
                            giveUp: false,
                            parameterId: parameter.id,
                            questionId: question.id,
                            stationId: station.id
                          })
                      }))}
                  >
                    {(list, search) => (
                      <div style={{ width: 240 }}>
                        <EuiPopoverTitle>{search}</EuiPopoverTitle>
                        {list}
                      </div>
                    )}
                  </EuiSelectable>
                </Menu>
              }
            >
              <Label style={{ cursor: 'pointer', margin: '5px' }} basic>
                {category.iconName && <Icon name={category.iconName as any} />}
                {category.name}
              </Label>
            </Dropdown>
          ))}
        </div>
      )}

      <Divider hidden />

      <QuestionAnswers question={question} station={station} />
    </Segment>
  );
};

export default Question;
