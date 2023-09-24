import { z } from "zod";
export default {
  id: z.coerce.string().regex(/^\d+$/).transform(Number),
  schema: z.object({ name: z.string() }).strict(),
};
