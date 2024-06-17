import * as React from "react"

import {tv} from "tailwind-variants"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TEXTAREA = tv({
  base: `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:cursor-not-allowed disabled:opacity-50
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive`,
})

const Textarea = ({className, ...props}: TextareaProps) => <textarea className={TEXTAREA({className})} {...props} />
export {Textarea}
