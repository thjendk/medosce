import React, { useContext, useState } from 'react';
import { Dropdown, Menu, Tag, Input } from 'antd';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Parameter from 'classes/Parameter';
import Question from 'classes/Question';
import { QuestionIdContext } from './Station';
import 'antd/es/dropdown/style/css';
import 'antd/es/menu/style/css';
import 'antd/es/input/style/css';
import { Modal, Button } from 'semantic-ui-react';

export interface QuestionVoteParameterDropdownProps {
  answerId: number;
}

const QuestionVoteParameterDropdown: React.SFC<QuestionVoteParameterDropdownProps> = ({
  answerId
}) => {
  const [newParameterName, setNewParameterName] = useState('');
  const [suggestLoading, setSuggestLoading] = useState(false);
  const questionId = useContext(QuestionIdContext);
  const question = useSelector((state: ReduxState) =>
    state.quiz.questions.find((question) => question.id === questionId)
  );
  const user = useSelector((state: ReduxState) => state.auth.user);
  const answer = question.answers.find((answer) => answer.id === answerId);
  const alreadyVotedIds = answer.parameters.map((parameter) => parameter.id);
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const parentParameters = parameters.filter((parameter) => !parameter.parent.id);
  const [addingParameterParentId, setAddingParameterParentId] = useState<number>(null);

  const handleVote = async (parameterId: number) => {
    await Question.createOrUpdateVote({ parameterId, questionAnswerId: answerId, vote: 1 });
  };

  const handleSuggestParameter = async () => {
    setSuggestLoading(true);
    await Parameter.suggest({ name: newParameterName, parentId: addingParameterParentId });
    setNewParameterName('');
    setAddingParameterParentId(null);
    setSuggestLoading(false);
  };

  const createChildren = (parameter: Parameter) => {
    const children = parameters.filter(
      ({ parent }) => parent.id === parameter.id && !alreadyVotedIds.includes(parameter.id)
    );
    if (children.length < 1) {
      return (
        <Menu.Item onClick={() => handleVote(parameter.id)}>
          {parameter.name.toTitleCase()}
        </Menu.Item>
      );
    }
    return (
      <Menu.SubMenu title={parameter.name.toTitleCase()}>
        {children.map((child) => createChildren(child))}
        <Menu.Divider />
        <Menu.Item onClick={() => setAddingParameterParentId(parameter.id)}>
          + Foreslå ny parameter
        </Menu.Item>
      </Menu.SubMenu>
    );
  };

  return (
    <>
      <Modal onClose={() => setAddingParameterParentId(null)} open={!!addingParameterParentId}>
        <Modal.Header>
          Du er ved at tilføje en ny parameter under "
          {parameters
            .find((parameter) => parameter.id === addingParameterParentId)
            ?.name.toTitleCase()}
          "
        </Modal.Header>
        <Modal.Content>
          <Input
            value={newParameterName}
            onChange={(e) => setNewParameterName(e.target.value)}
            size="large"
            placeholder="Parameter navn"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            loading={suggestLoading}
            disabled={suggestLoading}
            onClick={handleSuggestParameter}
            basic
            color="green"
          >
            Tilføj
          </Button>
          <Button
            disabled={suggestLoading}
            onClick={() => setAddingParameterParentId(null)}
            basic
            color="black"
          >
            Annuller
          </Button>
        </Modal.Actions>
      </Modal>
      {user && (
        <Dropdown
          placement="topCenter"
          overlay={
            <Menu forceSubMenuRender>
              {parentParameters.map((parameter) => createChildren(parameter))}
              <Menu.Divider />
              <Menu.Item>+ Foreslå ny overmenu</Menu.Item>
              <Menu.Item>Foreslå anden rettelse</Menu.Item>
            </Menu>
          }
        >
          <Tag>+ Parameter</Tag>
        </Dropdown>
      )}
    </>
  );
};

export default QuestionVoteParameterDropdown;
