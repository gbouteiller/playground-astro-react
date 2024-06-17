import {getContactMessage, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Toaster} from "@/components/ui/sonner"
import {cn} from "@/lib/utils"
import {experimental_withState} from "@astrojs/react/actions"
import {useForm} from "@tanstack/react-form"
import {zodValidator} from "@tanstack/zod-form-adapter"
import {ActionInputError, actions} from "astro:actions"
import {useActionState, useEffect, type FormEvent, type ReactNode} from "react"
import {toast} from "sonner"
import {FormInput, FormItem, FormLabel, FormMessage, FormTextarea} from "./ui"

export default ({children, defaultValues, initialState}: ContactFormProps) => {
  const [state, action, pending] = useActionState(experimental_withState(actions.sendEmail.safe), initialState)

  const form = useForm<ContactValues>({defaultValues})

  if (initialState.error instanceof ActionInputError)
    Object.entries(initialState.error.fields).forEach(([field, errors = []]) => {
      const meta = {
        errors,
        isDirty: false,
        isTouched: false,
        isPristine: true,
        isValidating: false,
        touchedErrors: errors,
        errorMap: {onChange: errors?.[0]},
      }
      form.setFieldMeta(field as keyof ContactValues, meta)
    })

  useEffect(() => {
    const {code, description} = getContactMessage(state) ?? {}
    if (!code) return
    if (code === "SUCCESS") form.reset()
    code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [state])

  function onSubmit(e: FormEvent) {
    if (form.state.isPristine || !form.state.canSubmit) {
      e.preventDefault()
      e.stopPropagation()
    }
    form.handleSubmit()
  }

  return (
    <form action={action} onSubmit={onSubmit} className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>N'hésitez pas à nous contacter si vous avez la moindre question</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 sm:flex-row">
            <form.Field name="forename" validatorAdapter={zodValidator} validators={{onChange: zContactValues.shape.forename}}>
              {(field) => (
                <FormItem className="flex-1">
                  <FormLabel field={field}>Prénom</FormLabel>
                  <FormInput field={field} placeholder="Votre prénom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </form.Field>
            <form.Field name="surname" validatorAdapter={zodValidator} validators={{onChange: zContactValues.shape.surname}}>
              {(field) => (
                <FormItem className="flex-1">
                  <FormLabel field={field}>Nom</FormLabel>
                  <FormInput field={field} placeholder="Votre nom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </form.Field>
          </div>
          <form.Field name="email" validatorAdapter={zodValidator} validators={{onChange: zContactValues.shape.email}}>
            {(field) => (
              <FormItem>
                <FormLabel field={field}>Votre courriel</FormLabel>
                <FormInput field={field} placeholder="Votre courriel..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          </form.Field>
          <form.Field name="message" validatorAdapter={zodValidator} validators={{onChange: zContactValues.shape.message}}>
            {(field) => (
              <FormItem>
                <FormLabel field={field}>Votre message</FormLabel>
                <FormTextarea field={field} placeholder="Votre message..." rows={8} />
                <FormMessage field={field} />
              </FormItem>
            )}
          </form.Field>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={pending} className="flex gap-2">
            <span className={cn("h-4 w-4", pending ? "i-lucide-loader animate-spin" : "i-lucide-send")}></span>
            <span>Envoyer</span>
          </Button>
        </CardFooter>
      </Card>
      <Toaster richColors />
      {children}
    </form>
  )
}
export type ContactFormProps = {children?: ReactNode; defaultValues: ContactValues; initialState: ContactState}
