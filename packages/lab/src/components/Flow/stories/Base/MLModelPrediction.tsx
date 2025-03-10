import { HvFlowNode } from "@hitachivantara/uikit-react-lab";

export const MLModelPrediction = (props) => {
  return <HvFlowNode description="Anomaly Prediction description" {...props} />;
};

MLModelPrediction.meta = {
  label: "ML Model Prediction",
  groupId: "models",
  inputs: [
    {
      label: "Sensor Data",
      isMandatory: true,
      accepts: ["sensorData"],
    },
  ],
  outputs: [
    {
      label: "Prediction",
      isMandatory: true,
      provides: "prediction",
    },
  ],
};
