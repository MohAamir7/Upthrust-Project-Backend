import{z} from 'zod';
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(2000),
  website: z.string().optional().default(""), // honeypot: real users never fill this
});