import React from 'react';
import { EuiSelectable, EuiPopoverTitle } from '@elastic/eui';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import ParameterAnswer from 'classes/ParameterAnswer';
import { ReduxState } from 'redux/reducers';

export interface QuestionToolboxProps {
  index: number;
}

const QuestionToolbox: React.SFC<QuestionToolboxProps> = ({ index }) => {
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const { station } = useSelector((state: ReduxState) => state.quiz.items[stationIndex]);
  const question = station.questions[index];
  const answers = useSelector((state: ReduxState) =>
    state.quiz.parameterAnswers.filter((answer) => answer.questionId === question.id)
  );
  const answerParameterIds = answers.map((answer) => answer.parameterId);
  const categories = useSelector((state: ReduxState) =>
    state.quiz.categories.filter((category) =>
      category.questionTypes.some((type) =>
        question.questionTypes.map((questionType) => questionType.id).includes(type.id)
      )
    )
  );
  const showToolbox = useSelector((state: ReduxState) => state.settings.showToolbox);

  const handleAnswer = (data: ParameterAnswer) => {
    ParameterAnswer.answer(data);
  };

  if (!showToolbox) return null;
  return (
    <>
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
                  key: parameter.id.toString(),
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
        <Menu.Item>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: 'grey', margin: '1em' }}>Toolbox</span>
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default QuestionToolbox;
