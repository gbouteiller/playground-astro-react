import {type FieldMeta, type FormState} from "@tanstack/react-form/nextjs"
import {ActionInputError, type SafeResult} from "astro:actions"
import {type FieldValues} from "./utils"

export function getFormState<V extends FieldValues, R>({error}: SafeResult<V, R>): Partial<FormState<V>> {
  return {
    ...(error instanceof ActionInputError
      ? {
          fieldMeta: Object.fromEntries(
            Object.entries(error.fields).map(([field, errors = []]) => [field, {errors, errorMap: {onChange: errors?.[0]}}])
          ) as Record<keyof V, FieldMeta>,
        }
      : {}),
  }
}

export function toFormData<V extends FieldValues>(values: V): FormData {
  return Object.entries(values).reduce((formData, [key, value]) => {
    formData.append(key, value)
    return formData
  }, new FormData())
}
