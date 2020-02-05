import React, { useContext } from 'react';
import { Dropdown, Menu, Tag } from 'antd';
import 'antd/es/dropdown/style/css';
import 'antd/es/menu/style/css';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Parameter from 'classes/Parameter';
import Question from 'classes/Question';
import { QuestionIdContext } from './Station';

export interface QuestionVoteParameterDropdownProps {
  answerId: number;
}

const QuestionVoteParameterDropdown: React.SFC<QuestionVoteParameterDropdownProps> = ({
  answerId
}) => {
  const questionId = useContext(QuestionIdContext);
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );
  const answer = question.answers.find((answer) => answer.id === answerId);
  const alreadyVotedIds = answer.parameters.map((parameter) => parameter.id);
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const parentParameters = parameters.filter((parameter) => !parameter.parent.id);

  const handleVote = async (parameterId: number) => {
    await Question.createOrUpdateVote({ parameterId, questionAnswerId: answerId, vote: 1 });
  };

  const createChildren = (parameter: Parameter) => {
    const children = parameters.filter(
      ({ parent }) => parent.id === parameter.id && !alreadyVotedIds.includes(parameter.id)
    );
    if (children.length < 1) {
      return <Menu.Item onClick={() => handleVote(parameter.id)}>{parameter.name}</Menu.Item>;
    }
    return (
      <Menu.SubMenu title={parameter.name}>
        {children.map((child) => createChildren(child))}
      </Menu.SubMenu>
    );
  };

  return (
    <Dropdown
      placement="topCenter"
      overlay={
        <Menu forceSubMenuRender>
          {parentParameters.map((parameter) => createChildren(parameter))}
        </Menu>
      }
    >
      <Tag>+ Ny parameter</Tag>
    </Dropdown>
  );
};

export default QuestionVoteParameterDropdown;
