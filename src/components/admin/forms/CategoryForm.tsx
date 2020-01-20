import React from 'react';
import { EuiText, EuiForm, EuiFieldText, EuiFormRow, EuiButton } from '@elastic/eui';
import Category, { CategoryInput } from 'classes/Category';
import { useFormik } from 'formik';

export interface CategoryFormProps {}

const CategoryForm: React.SFC<CategoryFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      iconName: ''
    },
    onSubmit: (values) => handleSubmit(values)
  });

  const handleSubmit = async (data: CategoryInput) => {
    await Category.create(data);
    formik.resetForm();
  };

  return (
    <div>
      <EuiText>Add Category</EuiText>
      <EuiForm>
        <EuiFormRow label="Navn">
          <EuiFieldText name="name" onChange={formik.handleChange} value={formik.values.name} />
        </EuiFormRow>
        <EuiFormRow label="Icon name">
          <EuiFieldText
            name="iconName"
            onChange={formik.handleChange}
            value={formik.values.iconName}
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

export default CategoryForm;
