interface ConcatenatedNumberHookResult {
  displayedConcatenatedNumber: number;
  handleButtonClick: (value: number) => void;
  handleResetClick: () => void;
  setDisplayedConcatenatedNumber: React.Dispatch<React.SetStateAction<number>>;
}

interface EnterClickHookResult {
  handleEnterClick: (displayedConcatenatedNumber: number) => void
}

interface AmountEffectHookResult {
  enterClicked: boolean
}

interface EnterClickEffectHookResult {
  amountEnterClicked: boolean,
  setEnterClicked: React.Dispatch<React.SetStateAction<boolean>>,
  handleResetClick: () => void
}