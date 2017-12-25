declare module 'redux-form' {
  type anyProps = { [key: string]: {} };
  function Field(): React.Component<anyProps>;
  function Form(): React.Component<anyProps>;
  function reduxForm({}): <T>(c: T) => T;
  function reducer(): object;
  interface SubmissionError {
    new (error?: {}): Error;
  }
  function getFormValues(
    formName: string
  ): (formName: {}) => {};
  function stopSubmit(
    formName: string,
    errorObject?: {}
  ): any;
  function isSubmitting(formName: string): any;
  function setSubmitFailed(formName: string): any;
  function setSubmitSucceeded(formName: string): any;
  function touch(formName: string): any;
  function clearSubmitErrors(formName: string): any;
  function getFormMeta(
    formName: string,
    ...fields: string[]
  ): (state: {}) => {};
  function getFormSyncErrors(
    formName: string
  ): (state: {}) => {};
  function getFormSubmitErrors(
    formName: string
  ): (state: {}) => {};
  function getFormNames(): any;
}
