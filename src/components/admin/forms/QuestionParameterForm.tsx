import React from 'react';
import { EuiForm, EuiFormRow, EuiText, EuiFieldText, EuiTextArea, EuiButton } from '@elastic/eui';
import { Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import Question, { QuestionAnswerInput } from 'classes/Question';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface QuestionParameterFormProps {
  questionId: number;
}

const QuestionParameterForm: React.SFC<QuestionParameterFormProps> = ({ questionId }) => {
  let parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  parameters = parameters.filter(
    (parameter) => !parameters.some((param) => parameter.parent.id === param.id)
  );
  const formik = useFormik({
    initialValues: {
      questionId: questionId,
      value: '',
      point: 0
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (values: QuestionAnswerInput) => {
    await Question.addAnswer(values);
    formik.setFieldValue('value', '');
  };

  return (
    <div>
      <EuiText>
        <p>Add answer to question</p>
      </EuiText>
      <EuiForm>
        <EuiFormRow label="Value">
          <EuiTextArea name="value" onChange={formik.handleChange} value={formik.values.value} />
        </EuiFormRow>
        <EuiFormRow label="Point">
          <EuiFieldText
            name="point"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.point}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton color="primary" onClick={() => formik.handleSubmit()}>
            Submit
          </EuiButton>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
};

export default QuestionParameterForm;
