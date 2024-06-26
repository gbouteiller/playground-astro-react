import {isInputError, type ActionError} from "astro:actions"
import type {FieldErrors} from "react-hook-form"
import type {FieldValues} from "./utils"

export function rhfErrorsFromAstro<T extends FieldValues = FieldValues>(error?: ActionError) {
  if (!error) return
  if (!isInputError(error)) return {root: {type: error.code}} as FieldErrors<T>
  return Object.fromEntries(Object.entries(error.fields).map(([name, errors]) => [name, {message: errors?.[0]}])) as FieldErrors<T>
}
