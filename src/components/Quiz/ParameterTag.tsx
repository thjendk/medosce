import { Tag } from 'antd';
import Parameter from 'classes/Parameter';
import { QuestionAnswer } from 'classes/Question';
import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

import ParameterTagVoting from './ParameterTagVoting';

export interface ParameterTagProps {
  error?: boolean;
  parameter: Parameter;
  answer?: QuestionAnswer;
}

const ParameterTag: React.SFC<ParameterTagProps> = ({ error, parameter, answer }) => {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);

  const getParentParameterName = (parentId: number) => {
    if (!parentId) return '';
    const parameter = parameters.find((parameter) => parameter.id === parentId);
    return `${getParentParameterName(parameter.parent.id) + parameter.name.toTitleCase()} ➜ `;
  };

  if (!parameter) return null;
  return (
    <Tag style={{ marginTop: '5px' }} color={error ? 'red' : null}>
      {getParentParameterName(parameter.parent.id) + parameter.name.toTitleCase()}
      {user && !error && <ParameterTagVoting parameter={parameter} answer={answer} />}
    </Tag>
  );
};

export default ParameterTag;
