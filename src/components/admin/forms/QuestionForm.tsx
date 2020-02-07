import React from 'react';
import { EuiText, EuiForm, EuiFormRow, EuiFieldText, EuiButton } from '@elastic/eui';
import { useFormik } from 'formik';
import Question, { QuestionInput } from 'classes/Question';
import { EuiTextArea } from '@elastic/eui';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface QuestionFormProps {
  stationId: number;
}

const QuestionForm: React.SFC<QuestionFormProps> = ({ stationId }) => {
  const questions = useSelector((state: ReduxState) =>
    state.admin.questions.filter((question) => question.station.id === stationId)
  );
  const nextQuestionNumber = questions.reduce(
    (largest, current) =>
      (largest = current.questionNumber > largest ? current.questionNumber : largest),
    0
  );

  const formik = useFormik({
    initialValues: {
      stationId: stationId,
      text: '',
      questionNumber: nextQuestionNumber + 1
    },
    onSubmit: (values) => handleSubmit(values),
    enableReinitialize: true
  });

  const handleSubmit = async (data: Partial<QuestionInput>) => {
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
