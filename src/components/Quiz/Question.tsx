import React from 'react';
import { QuestionText } from 'styles/layout';
import QuestionClass from 'classes/Question';
import { Segment, Divider, Icon, Menu, Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import UserAnswer from 'classes/UserAnswer';
import QuestionAnswers from './QuestionAnswers';
import { EuiSelectable, EuiPopoverTitle } from '@elastic/eui';
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
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {missingAnswers > 0 && (
          <Menu vertical>
            {categories.map((category) => (
              <Popup
                hoverable
                flowing
                position="right center"
                trigger={
                  <Menu.Item style={{ cursor: 'pointer', margin: '5px' }}>
                    {category.iconName && <Icon name={category.iconName as any} />}
                    {category.name}
                  </Menu.Item>
                }
              >
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
              </Popup>
            ))}
          </Menu>
        )}

        <div style={{ width: '70%', flex: '1', margin: '1em' }}>
          <QuestionAnswers question={question} station={station} />
        </div>
      </div>
    </Segment>
  );
};

export default Question;
