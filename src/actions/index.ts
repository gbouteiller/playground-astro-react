import {ActionError, defineAction} from "astro:actions"
import {zContactValues} from "./utils"

// ACTIONS *********************************************************************************************************************************
export const server = {
  sendEmail: defineAction({
    accept: "form",
    input: zContactValues,
    handler: async ({email, forename, message, surname}) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const success = Math.random() > 0.5
      if (!success) throw new ActionError({code: "INTERNAL_SERVER_ERROR"})
      return true
    },
  }),
}
