import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

// MENU ************************************************************************************************************************************
export const mainNavs = [
  {id: "form", text: "Form", href: "/form"},
  {id: "auth", text: "Auth", href: "/auth"},
]

export const formNavs = [
  {id: "form_rhf", text: "React Hook Form", href: "/form/rhf"},
  {id: "form_tanstack", text: "Tanstack Form", href: "/form/tanstack"},
]

export const formRhfNavs = [
  {id: "form_rhf_normal", text: "Normal", href: "/form/rhf"},
  {id: "form_rhf_unloaded", text: "Unloaded", href: "/form/rhf/unloaded"},
]

export const formTanstackNavs = [
  {id: "form_tanstack_normal", text: "Normal", href: "/form/tanstack"},
  {id: "form_tanstack_unloaded", text: "Unloaded", href: "/form/tanstack/unloaded"},
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
