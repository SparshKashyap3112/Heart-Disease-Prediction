/**
 * Form validation and bounds for Heart Disease Health Assessment
 */

export const FIELD_BOUNDS = {
  Age: { min: 18, max: 100, default: 52, unit: "years", label: "Age" },
  RestingBP: { min: 70, max: 220, default: 125, unit: "mm Hg", label: "Resting Blood Pressure" },
  Cholesterol: { min: 80, max: 600, default: 210, unit: "mg/dL", label: "Serum Cholesterol" },
  MaxHR: { min: 60, max: 220, default: 145, unit: "bpm", label: "Maximum Heart Rate" },
  Oldpeak: { min: -2.5, max: 6.5, default: 1.0, unit: "mm", label: "ST Depression (Oldpeak)" },
};

export const DEFAULT_FORM_VALUES = {
  Age: 52,
  Sex: "M",
  ChestPainType: "ASY",
  RestingBP: 130,
  Cholesterol: 230,
  FastingBS: 0,
  RestingECG: "Normal",
  MaxHR: 142,
  ExerciseAngina: "N",
  Oldpeak: 1.2,
  ST_Slope: "Flat"
};

export const PRESET_PROFILES = [
  {
    id: "healthy",
    name: "Low-Risk Profile",
    badge: "General Benchmark",
    description: "Younger adult with normal blood pressure, optimal cholesterol, and upsloping ST segment.",
    values: {
      Age: 40,
      Sex: "F",
      ChestPainType: "ATA",
      RestingBP: 118,
      Cholesterol: 185,
      FastingBS: 0,
      RestingECG: "Normal",
      MaxHR: 168,
      ExerciseAngina: "N",
      Oldpeak: 0.0,
      ST_Slope: "Up"
    }
  },
  {
    id: "moderate_risk",
    name: "Elevated Risk Profile",
    badge: "Clinical Indicator",
    description: "Middle-aged patient presenting with asymptomatic chest pain, elevated cholesterol, and flat ST slope.",
    values: {
      Age: 58,
      Sex: "M",
      ChestPainType: "ASY",
      RestingBP: 145,
      Cholesterol: 275,
      FastingBS: 1,
      RestingECG: "ST",
      MaxHR: 122,
      ExerciseAngina: "Y",
      Oldpeak: 2.2,
      ST_Slope: "Flat"
    }
  },
  {
    id: "atypical",
    name: "Typical Active Senior",
    badge: "Routine Checkup",
    description: "Active senior with non-anginal discomfort, good heart rate response, and mild oldpeak.",
    values: {
      Age: 62,
      Sex: "F",
      ChestPainType: "NAP",
      RestingBP: 132,
      Cholesterol: 215,
      FastingBS: 0,
      RestingECG: "Normal",
      MaxHR: 150,
      ExerciseAngina: "N",
      Oldpeak: 0.5,
      ST_Slope: "Up"
    }
  }
];

export function validateForm(values) {
  const errors = {};

  // Age validation
  if (values.Age === "" || values.Age === null || isNaN(values.Age)) {
    errors.Age = "Please enter a valid age";
  } else if (Number(values.Age) < FIELD_BOUNDS.Age.min || Number(values.Age) > FIELD_BOUNDS.Age.max) {
    errors.Age = `Age must be between ${FIELD_BOUNDS.Age.min} and ${FIELD_BOUNDS.Age.max}`;
  }

  // RestingBP validation
  if (values.RestingBP === "" || values.RestingBP === null || isNaN(values.RestingBP)) {
    errors.RestingBP = "Please enter resting blood pressure";
  } else if (Number(values.RestingBP) < FIELD_BOUNDS.RestingBP.min || Number(values.RestingBP) > FIELD_BOUNDS.RestingBP.max) {
    errors.RestingBP = `Resting BP must be between ${FIELD_BOUNDS.RestingBP.min} and ${FIELD_BOUNDS.RestingBP.max} mm Hg`;
  }

  // Cholesterol validation
  if (values.Cholesterol === "" || values.Cholesterol === null || isNaN(values.Cholesterol)) {
    errors.Cholesterol = "Please enter serum cholesterol";
  } else if (Number(values.Cholesterol) < 0 || Number(values.Cholesterol) > FIELD_BOUNDS.Cholesterol.max) {
    errors.Cholesterol = `Cholesterol must be between 0 and ${FIELD_BOUNDS.Cholesterol.max} mg/dL`;
  }

  // MaxHR validation
  if (values.MaxHR === "" || values.MaxHR === null || isNaN(values.MaxHR)) {
    errors.MaxHR = "Please enter maximum heart rate";
  } else if (Number(values.MaxHR) < FIELD_BOUNDS.MaxHR.min || Number(values.MaxHR) > FIELD_BOUNDS.MaxHR.max) {
    errors.MaxHR = `Max HR must be between ${FIELD_BOUNDS.MaxHR.min} and ${FIELD_BOUNDS.MaxHR.max} bpm`;
  }

  // Oldpeak validation
  if (values.Oldpeak === "" || values.Oldpeak === null || isNaN(values.Oldpeak)) {
    errors.Oldpeak = "Please enter ST depression value";
  } else if (Number(values.Oldpeak) < FIELD_BOUNDS.Oldpeak.min || Number(values.Oldpeak) > FIELD_BOUNDS.Oldpeak.max) {
    errors.Oldpeak = `Oldpeak must be between ${FIELD_BOUNDS.Oldpeak.min} and ${FIELD_BOUNDS.Oldpeak.max}`;
  }

  // Categorical checks
  if (!["M", "F"].includes(values.Sex)) {
    errors.Sex = "Please select sex";
  }

  if (!["ASY", "ATA", "NAP", "TA"].includes(values.ChestPainType)) {
    errors.ChestPainType = "Please select a valid chest pain type";
  }

  if (!["Normal", "ST", "LVH"].includes(values.RestingECG)) {
    errors.RestingECG = "Please select a valid resting ECG";
  }

  if (!["Up", "Flat", "Down"].includes(values.ST_Slope)) {
    errors.ST_Slope = "Please select ST slope";
  }

  if (!["Y", "N"].includes(values.ExerciseAngina)) {
    errors.ExerciseAngina = "Please select exercise angina status";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
