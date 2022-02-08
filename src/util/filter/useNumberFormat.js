import { useMemo } from "react";

export default function useNumberFormat(value) {
  return useMemo(() => {
    return value + 123123
  }, [value])

}