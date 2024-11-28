// Imports
import { z } from 'zod';

export const SearchScheduleProps = z.object({
    unity: z.string().optional(),
    location: z.string().optional(),
    date: z.string().optional(),
    status: z.string().optional()
});

export type SearchScheduleInfer = z.infer<typeof SearchScheduleProps>;