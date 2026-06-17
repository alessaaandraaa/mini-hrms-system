import { z } from "zod"

const formSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(5, "Password too short!")
})

export { formSchema };