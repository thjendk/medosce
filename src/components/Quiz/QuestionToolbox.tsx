import React from 'react';
import { useSelector } from 'react-redux';
import ParameterAnswer from 'classes/ParameterAnswer';
import { ReduxState } from 'redux/reducers';
import { Menu } from 'antd';
import Parameter from 'classes/Parameter';
import 'antd/es/menu/style/css';

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
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
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

  const createChildren = (parameter: Parameter) => {
    const children = parameters.filter(({ parent }) => parent.id === parameter.id);

    if (answerParameterIds.includes(parameter.id)) return null;
    if (children.length < 1)
      return (
        <Menu.Item
          onClick={() =>
            handleAnswer({
              giveUp: false,
              parameterId: parameter.id,
              questionId: question.id,
              stationId: station.id
            })
          }
        >
          {parameter.name}
        </Menu.Item>
      );
    return (
      <Menu.SubMenu title={parameter.name}>
        {children.map((child) => createChildren(child))}
      </Menu.SubMenu>
    );
  };

  if (!showToolbox) return null;
  return (
    <>
      <Menu forceSubMenuRender mode="vertical" style={{ width: 200 }}>
        {categories.map((category) => (
          <Menu.SubMenu title={category.name}>
            {category.parameters
              .filter((parameter) => !parameter.parent.id)
              .map((parameter) => createChildren(parameter))}
          </Menu.SubMenu>
        ))}
        <Menu.Item style={{ cursor: 'unset' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: 'grey', margin: '1em' }}>Toolbox</span>
          </div>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default QuestionToolbox;
