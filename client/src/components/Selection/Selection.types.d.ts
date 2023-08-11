interface SubmitHandlerHookProps {
  amountRef: React.MutableRefObject<HTMLInputElement>,
  submitAllowed: boolean,
  dispatch: React.Dispatch<AnyAction>
}