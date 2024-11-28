// Imports
import { z } from 'zod'

export const SearchPackagesSchema = z.object({
    packageCode: z.string().optional(),
    recipient: z.string().optional(),
    userUnity: z.string().optional(),
    createdAt: z.string().optional(),
    status: z.string().optional()
});

export type SearchPackageInfer = z.infer<typeof SearchPackagesSchema>;