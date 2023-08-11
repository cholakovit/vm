interface FlagEffectHookProps {
  flag: number
  value: number
  callback: (value: number) => void
}

interface ChangeEffectHookProps {
  change: number | null
  dispatch: React.Dispatch<AnyAction>
}