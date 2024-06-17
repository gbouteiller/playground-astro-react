import {getContactMessage, rhfErrorsFromAstro, zContactValues, type ContactState, type ContactValues} from "@/actions/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Toaster} from "@/components/ui/sonner"
import {Textarea} from "@/components/ui/textarea"
import {cn} from "@/lib/utils"
import {experimental_withState} from "@astrojs/react/actions"
import {zodResolver} from "@hookform/resolvers/zod"
import {actions} from "astro:actions"
import {useActionState, useEffect, useMemo, type ReactNode} from "react"
import {useForm} from "react-hook-form"
import {toast} from "sonner"

export default ({children, defaultValues, initialState}: ContactFormProps) => {
  const [state, action, pending] = useActionState(experimental_withState(actions.sendEmail.safe), initialState)

  const form = useForm<ContactValues>({
    mode: "onTouched",
    resolver: zodResolver(zContactValues),
    defaultValues,
    errors: useMemo(() => rhfErrorsFromAstro(state.error), [state]),
  })
  const {control, formState, handleSubmit, reset} = form

  useEffect(() => {
    const {code, description} = getContactMessage(state) ?? {}
    if (!code) return
    reset(code === "SUCCESS" ? defaultValues : form.getValues())
    code === "SUCCESS" ? toast.success("Succès", {description}) : toast.error("Erreur", {description})
  }, [reset, state])

  return (
    <Form {...form}>
      <form action={action} onSubmit={formState.isValid ? undefined : handleSubmit(() => {})} className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>N'hésitez pas à nous contacter si vous avez la moindre question</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 sm:flex-row">
              <FormField
                control={control}
                name="forename"
                render={({field}) => (
                  <FormItem className="flex-1">
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre prénom..." {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="surname"
                render={({field}) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom..." {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Votre courriel</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre courriel..." {...field} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="message"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Votre message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Votre message..." {...field} rows={8} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
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
    </Form>
  )
}
export type ContactFormProps = {children?: ReactNode; defaultValues: ContactValues; initialState: ContactState}
