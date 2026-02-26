import { z } from "zod";

const schema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
      message: "PORT must be a valid port number (1-65535)",
    }),
  UPLOAD_DIR: z.string().min(1, "UPLOAD_DIR is required"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Environment validation failed:");
  parsed.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;
