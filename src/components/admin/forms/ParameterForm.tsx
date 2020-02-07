import React from 'react';
import { EuiText, EuiForm, EuiFormRow, EuiFieldText, EuiButton } from '@elastic/eui';
import { useFormik } from 'formik';
import Parameter, { ParameterInput } from 'classes/Parameter';

export interface ParameterFormProps {}

const ParameterForm: React.SFC<ParameterFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      parentId: null,
      isForcedSubMenu: false
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (data: ParameterInput) => {
    await Parameter.create(data);
    formik.resetForm();
  };

  return (
    <div>
      <EuiText>Add Parameter</EuiText>
      <EuiForm>
        <EuiFormRow label="Navn">
          <EuiFieldText name="name" onChange={formik.handleChange} value={formik.values.name} />
        </EuiFormRow>
        <EuiButton color="primary" onClick={() => formik.handleSubmit()}>
          Submit
        </EuiButton>
      </EuiForm>
    </div>
  );
};

export default ParameterForm;
