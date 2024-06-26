import * as React from "react"

import {tv} from "tailwind-variants"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const INPUT = tv({
  base: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
  file:border-0 file:bg-transparent file:text-sm file:font-medium 
  placeholder:text-muted-foreground 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:cursor-not-allowed disabled:opacity-50
  aria-[invalid=true]:ring-destructive aria-[invalid=true]:border-destructive`,
})

const Input = ({className, type, ...props}: InputProps) => <input type={type} className={INPUT({className})} {...props} />
export {Input}
