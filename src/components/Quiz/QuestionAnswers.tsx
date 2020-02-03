import React, { useState } from 'react';
import { Divider, Button, Icon, Popup } from 'semantic-ui-react';
import Question, { QuestionParameter } from 'classes/Question';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { StyledDivider } from 'styles/layout';
import ForwardButton from './ForwardButton';
import { EuiInMemoryTable, EuiTextArea } from '@elastic/eui';
import ParameterAnswer from 'classes/ParameterAnswer';
import Parameter from 'classes/Parameter';
import TextAnswer from 'classes/TextAnswer';
import { EuiButton } from '@elastic/eui';
import QuestionMeta from './QuestionMeta';
import { EuiSelectable } from '@elastic/eui';
import { EuiPopoverTitle } from '@elastic/eui';

export interface QuestionAnswersProps {
  index: number;
}

const QuestionAnswers: React.SFC<QuestionAnswersProps> = ({ index }) => {
  const [text, setText] = useState('');
  const stationIndex = useSelector((state: ReduxState) => state.quiz.stationIndex);
  const { station, questionIndex } = useSelector(
    (state: ReduxState) => state.quiz.items[stationIndex]
  );
  const question = station.questions[index];
  const answers = useSelector((state: ReduxState) =>
    state.quiz.parameterAnswers.filter((answer) => answer.questionId === question.id)
  );
  const currentQuestionIndex = station.questions.findIndex(
    (stationQuestion) => stationQuestion.id === question.id
  );
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const answerParameterIds = answers.map((answer) => answer.parameterId);
  const missingParameters = question.parameters.filter(
    (questionParameter) => !answerParameterIds.includes(questionParameter.parameter.id)
  );
  const missingAnswersCount = missingParameters.length;
  const items = answers.map((answer) => ({
    answer,
    questionParameter: question.parameters.find(
      (questionParameter) => questionParameter.parameter.id === answer.parameterId
    ),
    parameter: parameters.find((parameter) => parameter.id === answer.parameterId)
  }));

  const handleGotIt = (data: ParameterAnswer) => {
    ParameterAnswer.answer(data);
  };

  const handleForwards = () => {
    for (let missing of missingParameters) {
      ParameterAnswer.answer({
        parameterId: missing.parameter.id,
        giveUp: true,
        questionId: question.id,
        stationId: station.id
      });
    }
    TextAnswer.answer({ questionId: question.id, text });
    ParameterAnswer.submitAnswers();
    Question.nextQuestion(station.id);
  };

  const columns = [
    {
      name: 'Svar',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: ParameterAnswer;
      }) => {
        const popup = (
          <Popup hoverable position="top center" trigger={<Icon name="exclamation" />}>
            <EuiSelectable
              searchable
              singleSelection
              searchProps={{
                placeholder: 'Søg...',
                compressed: true
              }}
              options={parameters.map((parameter) => ({
                label: parameter.name,
                key: parameter.id.toString(),
                value: parameter.id.toString()
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
        );

        if (!item.questionParameter)
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <span style={{ color: 'red' }}>
                <Icon name="close" color="red" /> {item.parameter.name}
              </span>
              {popup}
            </div>
          );
        if (item.answer.giveUp)
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center'
              }}
            >
              <span style={{ color: 'orange' }}>
                <Icon name="question" color="orange" /> {item.parameter.name.toTitleCase()}
              </span>
              {popup}
            </div>
          );
        return (
          <span style={{ color: 'green' }}>
            <Icon name="checkmark" color="green" /> {item.parameter.name.toTitleCase()}
          </span>
        );
      }
    },
    {
      name: 'Detaljer',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: ParameterAnswer;
      }) => item.questionParameter?.value
    },
    {
      name: 'Point',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: ParameterAnswer;
      }) => {
        if (!item.questionParameter) return 0;
        if (item.answer.giveUp) return `${item.questionParameter.point} point mistet`;
        return item.questionParameter.point;
      }
    },
    {
      name: 'Valg',
      render: (item: {
        parameter: Parameter;
        questionParameter: QuestionParameter;
        answer: ParameterAnswer;
      }) => (
        <EuiButton
          color="text"
          size="s"
          onClick={() =>
            handleGotIt({
              giveUp: !item.answer.giveUp,
              questionId: question.id,
              parameterId: item.parameter.id,
              stationId: station.id
            })
          }
        >
          {item.answer.giveUp ? 'Overvejet' : 'Ikke overvejet'}
        </EuiButton>
      )
    }
  ];

  return (
    <div>
      {missingAnswersCount > 1 && (
        <div style={{ textAlign: 'center' }}>
          <p>Du mangler {missingAnswersCount} værdier.</p>
          <Divider />
        </div>
      )}
      <EuiTextArea
        placeholder="Overvejelser..."
        fullWidth
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={missingAnswersCount === 0 || questionIndex > currentQuestionIndex}
      />
      <QuestionMeta />
      {items.length > 0 && (
        <>
          <Divider />
          <EuiInMemoryTable sorting items={items} columns={columns} />
          <Divider />
        </>
      )}
      <ForwardButton handleForwards={handleForwards} index={index} />
    </div>
  );
};

export default QuestionAnswers;
