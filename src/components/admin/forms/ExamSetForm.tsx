import React from 'react';
import { EuiForm, EuiFormRow, EuiSelect, EuiFieldText, EuiText, EuiButton } from '@elastic/eui';
import ExamSet, { ExamSetInput } from 'classes/ExamSet';
import { useFormik } from 'formik';

export interface ExamSetFormProps {}

const ExamSetForm: React.SFC<ExamSetFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      season: 'E' as 'E' | 'F',
      year: ''
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (values: ExamSetInput) => {
    await ExamSet.create(values);
    formik.resetForm();
  };

  const seasonOptions = [
    {
      text: 'Efterår',
      value: 'E'
    },
    {
      text: 'Forår',
      value: 'F'
    }
  ];
  return (
    <div>
      <EuiText>
        <p>Add new examSet</p>
      </EuiText>
      <EuiForm>
        <EuiFormRow label="Season">
          <EuiSelect
            options={seasonOptions}
            value={formik.values.season}
            name="season"
            onChange={formik.handleChange}
          />
        </EuiFormRow>
        <EuiFormRow label="Year">
          <EuiFieldText
            value={formik.values.year}
            name="year"
            onChange={formik.handleChange}
            maxLength={4}
            minLength={4}
          />
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton onClick={() => formik.handleSubmit()}>Submit</EuiButton>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
};

export default ExamSetForm;
