import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

// MENU ************************************************************************************************************************************
export const mainNavs = [
  {id: "form", text: "Form", href: "/form"},
  {id: "auth", text: "Auth", href: "/auth"},
]

export const formNavs = [
  {id: "form_modular-forms", text: "Modular Forms", href: "/form/modular-forms"},
  {id: "form_react-hook-form", text: "React Hook Form", href: "/form/react-hook-form"},
  {id: "form_tanstack-form", text: "Tanstack Form", href: "/form/tanstack-form"},
]

export const formModularFormsNavs = [
  {id: "form_modular-forms_normal", text: "Normal", href: "/form/modular-forms"},
  {id: "form_modular-forms_unloaded", text: "Unloaded", href: "/form/modular-forms/unloaded"},
]

export const formReactHookFormNavs = [
  {id: "form_react-hook-form_normal", text: "Normal", href: "/form/react-hook-form"},
  {id: "form_react-hook-form_unloaded", text: "Unloaded", href: "/form/react-hook-form/unloaded"},
]

export const formTanstackFormNavs = [
  {id: "form_tanstack-form_normal", text: "Normal", href: "/form/tanstack-form"},
  {id: "form_tanstack-form_unloaded", text: "Unloaded", href: "/form/tanstack-form/unloaded"},
]

export function menuFrom(navs: Nav[], pathname: string) {
  return navs.map((nav) => ({...nav, isActive: pathname.startsWith(nav.href)}))
}

export type Nav = {href: string; id: string; text: string}
export type MenuItem = ReturnType<typeof menuFrom>[number]

// STYLES **********************************************************************************************************************************
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
