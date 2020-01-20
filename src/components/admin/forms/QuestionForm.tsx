import React from 'react';
import { EuiText, EuiForm, EuiFormRow, EuiFieldText, EuiButton } from '@elastic/eui';
import { useFormik } from 'formik';
import Question, { QuestionInput } from 'classes/Question';
import { EuiTextArea } from '@elastic/eui';

export interface QuestionFormProps {
  stationId: string;
}

const QuestionForm: React.SFC<QuestionFormProps> = ({ stationId }) => {
  const formik = useFormik({
    initialValues: {
      stationId: stationId,
      text: '',
      questionNumber: 0
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (data: QuestionInput) => {
    await Question.create(data);
    formik.resetForm();
  };

  return (
    <div>
      <EuiText>
        <h2>Create question</h2>
      </EuiText>
      <EuiForm>
        <EuiFormRow label="Text">
          <EuiTextArea name="text" onChange={formik.handleChange} value={formik.values.text} />
        </EuiFormRow>
        <EuiFormRow label="Question Number">
          <EuiFieldText
            type="number"
            name="questionNumber"
            onChange={formik.handleChange}
            value={formik.values.questionNumber}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton size="s" color="primary" onClick={() => formik.handleSubmit()}>
            Submit
          </EuiButton>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
};

export default QuestionForm;
