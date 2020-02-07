import React from 'react';
import { EuiForm, EuiFormRow, EuiFieldText, EuiTextArea, EuiButton } from '@elastic/eui';
import Station, { StationInput } from 'classes/Station';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface StationFormProps {
  examSetId: number;
}

const StationForm: React.SFC<StationFormProps> = ({ examSetId }) => {
  const examSet = useSelector((state: ReduxState) =>
    state.admin.examSets.find((examSet) => examSet.id === examSetId)
  );
  const nextStationNumber = examSet.stations.reduce(
    (largest, current) =>
      (largest = current.stationNumber > largest ? current.stationNumber : largest),
    0
  );

  const formik = useFormik({
    initialValues: {
      globalScore: 0,
      stationNumber: nextStationNumber + 1,
      intro: '',
      examSetId: examSetId
    },
    onSubmit: (values) => handleSubmit(values),
    enableReinitialize: true
  });

  const handleSubmit = async (values: StationInput) => {
    await Station.create(values);
    formik.resetForm();
  };

  return (
    <div>
      <EuiForm>
        <EuiFormRow label="Global Score">
          <EuiFieldText
            name="globalScore"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.globalScore}
          />
        </EuiFormRow>
        <EuiFormRow label="Station number">
          <EuiFieldText
            name="stationNumber"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.stationNumber}
          />
        </EuiFormRow>
        <EuiFormRow label="Intro">
          <EuiTextArea name="intro" onChange={formik.handleChange} value={formik.values.intro} />
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton onClick={() => formik.handleSubmit()}>Submit</EuiButton>
        </EuiFormRow>
      </EuiForm>
    </div>
  );
};

export default StationForm;
