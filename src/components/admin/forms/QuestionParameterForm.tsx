import React from 'react';
import { EuiForm, EuiFormRow, EuiText, EuiFieldText, EuiTextArea, EuiButton } from '@elastic/eui';
import { Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import Question, { QuestionParameterInput } from 'classes/Question';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface QuestionParameterFormProps {
  questionId: string;
}

const QuestionParameterForm: React.SFC<QuestionParameterFormProps> = ({ questionId }) => {
  const parameters = useSelector((state: ReduxState) => state.quiz.parameters);
  const formik = useFormik({
    initialValues: {
      questionId: questionId,
      parameterId: '',
      value: '',
      point: 0
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (values: QuestionParameterInput) => {
    await Question.addParameter(values);
    formik.resetForm();
  };

  const parameterOptions = parameters.map((parameter) => ({
    text: parameter.name,
    value: parameter.id,
    key: parameter.id
  }));
  return (
    <div>
      <EuiText>
        <p>Add parameter to question</p>
      </EuiText>
      <EuiForm>
        <EuiFormRow label="Parameter">
          <Dropdown
            fluid
            search
            selection
            value={formik.values.parameterId}
            options={parameterOptions}
            onChange={(e, { value }) => formik.setFieldValue('parameterId', value)}
          />
        </EuiFormRow>
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
