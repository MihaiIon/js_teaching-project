// ======================================================
// Selectors
// ======================================================

// App
// ======================================================

export const getCurrentStep = ({ steps, currentStep }) => steps[currentStep];
export const isCurrentStepValid = ({ steps, currentStep }) =>
  steps[currentStep].validations
    .map(v => v.isValid)
    .reduce((isAllValid, isCurrentValid) => isAllValid && isCurrentValid, true);

export const isFirstStep = ({ currentStep }) => currentStep === 0;
export const isLastStep = ({ steps, currentStep }) => currentStep === steps.length - 1;
