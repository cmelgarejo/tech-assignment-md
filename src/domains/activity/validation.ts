import { z } from "zod";
export default {
  id: z.coerce.string().regex(/^\d+$/).transform(Number),
  schema: z
    .object({
      name: z.string(),
      product: z
        .object({
          id: z.number().positive(),
        })
        .required(),
      outputs: z
        .array(
          z.strictObject({
            toActivity: z
              .object({
                id: z.number().positive(),
              })
              .required(),
            value: z.number().refine((value) => value !== 0, {
              message: "Value must be a non-zero number",
            }),
          }),
        )
        .nonempty()
        .optional(),
      inputs: z
        .array(
          z
            .strictObject({
              fromActivity: z
                .object({
                  id: z.number().positive(),
                })
                .required(),
              value: z.number().refine((value) => value !== 0, {
                message: "Value must be a non-zero number",
              }),
            })
            .required(),
        )
        .nonempty()
        .optional(),
    })
    .strict(),
};
