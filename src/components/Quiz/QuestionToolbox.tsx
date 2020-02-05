import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import UserAnswer from 'classes/UserAnswer';
import { ReduxState } from 'redux/reducers';
import { Menu } from 'antd';
import Parameter from 'classes/Parameter';
import { QuestionIdContext } from './Station';
import 'antd/es/menu/style/css';
import { Divider } from 'semantic-ui-react';

export interface QuestionToolboxProps {}

const QuestionToolbox: React.SFC<QuestionToolboxProps> = () => {
  const questionId = useContext(QuestionIdContext);
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );
  const answers = useSelector((state: ReduxState) =>
    state.quiz.userAnswers.filter((answer) => answer.questionId === question.id)
  );
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const withoutParameters = question.answers.filter((answer) => answer.votes.length === 0);

  const getAllParents = (): Parameter[] => {
    let parents: Parameter[] = [];
    for (let child of question.answers.flatMap((answer) => answer.parameters)) {
      let current = child;
      while (current.parent.id) {
        const getParent = (parameter: Parameter): Parameter => {
          return parameters.find((parent) => parent.id === parameter.parent.id);
        };

        current = getParent(current);
      }

      const index = parents.findIndex((parent) => parent.id === current.id);
      if (index === -1) {
        parents.push(current);
      }
    }

    return parents;
  };

  const parentParameters = getAllParents();
  const answerParameterIds = answers.map((answer) => answer.parameterId);
  const showToolbox = useSelector((state: ReduxState) => state.settings.showToolbox);

  const handleAnswer = (data: UserAnswer) => {
    UserAnswer.answer(data);
  };

  const createChildren = (parameter: Parameter) => {
    if (answerParameterIds.includes(parameter.id)) return null;

    const children = parameters.filter(({ parent }) => parent.id === parameter.id);
    if (children.length < 1)
      return (
        <Menu.Item
          onClick={() =>
            handleAnswer({
              parameterId: parameter.id,
              questionId: question.id
            })
          }
        >
          {parameter.name.toTitleCase()}
        </Menu.Item>
      );
    return (
      <Menu.SubMenu title={parameter.name.toTitleCase()}>
        {children.map((child) => createChildren(child))}
      </Menu.SubMenu>
    );
  };

  if (!showToolbox) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #E8E8E8' }}>
      <Menu forceSubMenuRender mode="vertical" style={{ width: 200, flexGrow: 1 }}>
        {parentParameters.map((parameter) => createChildren(parameter))}
      </Menu>
      <p style={{ textAlign: 'center', fontSize: '13px', color: 'grey', margin: '5px' }}>
        Toolbox
        <br />
        {withoutParameters.length > 0 && <span>{withoutParameters.length} parametre mangles.</span>}
      </p>
    </div>
  );
};

export default QuestionToolbox;
