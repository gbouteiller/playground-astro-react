import {Input, type InputProps} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea, type TextareaProps} from "@/components/ui/textarea"
import {cn} from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import {FieldApi} from "@tanstack/react-form"

// INPUT ************************************************************************************************************************************
export const FormInput = ({field, ...props}: FormInputProps) => (
  <Input
    name={field.name}
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={(e) => field.handleChange(e.target.value)}
    aria-invalid={field.state.meta.errors.length > 0}
    {...props}
  />
)
export type FormInputProps = InputProps & {field: FieldApi<any, any, any>}

// ITEM ************************************************************************************************************************************
export const FormItem = ({className, ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-2", className)} {...props} />
)

// LABEL ***********************************************************************************************************************************
export const FormLabel = ({className, field, ...props}: FormLabelProps) => (
  <Label className={cn(field.state.meta.errors.length > 0 && "text-destructive", className)} htmlFor={field.name} {...props} />
)
export type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {field: FieldApi<any, any, any>}

// MESSAGE *********************************************************************************************************************************
export const FormMessage = ({className, children, field, ...props}: FormMessageProps) => {
  // const body = field.state.meta.errors.length > 0 ? field.state.meta.errors.at(0) : children
  const body = field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.toString().split(",")[0] : children // MONKEY PATCH

  return (
    body && (
      <p id={field.name + "_message"} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    )
  )
}
export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement> & {field: FieldApi<any, any, any>}

// TEXTAREA ********************************************************************************************************************************
export const FormTextarea = ({field, ...props}: FormTextareaProps) => (
  <Textarea
    name={field.name}
    value={field.state.value}
    onBlur={field.handleBlur}
    onChange={(e) => field.handleChange(e.target.value)}
    aria-invalid={field.state.meta.errors.length > 0}
    {...props}
  />
)
export type FormTextareaProps = TextareaProps & {field: FieldApi<any, any, any>}
