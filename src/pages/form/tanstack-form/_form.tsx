import {getFormState, toFormData} from "@/actions/tanstack-form"
import {getContactMessage, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Toaster} from "@/components/ui/sonner"
import {cn} from "@/lib/utils"
import {experimental_withState} from "@astrojs/react/actions"
import {mergeForm, useForm, useTransform} from "@tanstack/react-form"
import {zodValidator} from "@tanstack/zod-form-adapter"
import {actions} from "astro:actions"
import {startTransition, useActionState, useEffect, type FormEvent, type ReactNode} from "react"
import {toast} from "sonner"
import {FormInput, FormItem, FormLabel, FormMessage, FormTextarea} from "./_ui"

export default ({children, defaultState, defaultValues}: ContactFormProps) => {
  const [state, action, pending] = useActionState(experimental_withState(actions.sendEmail.safe), defaultState)

  const {Field, handleSubmit, reset} = useForm<ContactValues>({
    defaultValues,
    transform: useTransform((baseForm) => mergeForm(baseForm, getFormState(defaultState)), [state]),
    onSubmit: ({value}) => startTransition(() => action(toFormData(value))),
  })

  useEffect(() => {
    const {code, description} = getContactMessage(state) ?? {}
    if (!code) return
    if (code === "SUCCESS") reset()
    code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [reset, state])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    handleSubmit()
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
            <Field name="forename" validatorAdapter={zodValidator()} validators={{onChange: zContactValues.shape.forename}}>
              {(field) => (
                <FormItem className="flex-1">
                  <FormLabel field={field}>Prénom</FormLabel>
                  <FormInput field={field} placeholder="Votre prénom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </Field>
            <Field name="surname" validatorAdapter={zodValidator()} validators={{onChange: zContactValues.shape.surname}}>
              {(field) => (
                <FormItem className="flex-1">
                  <FormLabel field={field}>Nom</FormLabel>
                  <FormInput field={field} placeholder="Votre nom..." />
                  <FormMessage field={field} />
                </FormItem>
              )}
            </Field>
          </div>
          <Field name="email" validatorAdapter={zodValidator()} validators={{onChange: zContactValues.shape.email}}>
            {(field) => (
              <FormItem>
                <FormLabel field={field}>Votre courriel</FormLabel>
                <FormInput field={field} placeholder="Votre courriel..." />
                <FormMessage field={field} />
              </FormItem>
            )}
          </Field>
          <Field name="message" validatorAdapter={zodValidator()} validators={{onChange: zContactValues.shape.message}}>
            {(field) => (
              <FormItem>
                <FormLabel field={field}>Votre message</FormLabel>
                <FormTextarea field={field} placeholder="Votre message..." rows={8} />
                <FormMessage field={field} />
              </FormItem>
            )}
          </Field>
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
export type ContactFormProps = {children?: ReactNode; defaultValues: ContactValues; defaultState: ContactState}
