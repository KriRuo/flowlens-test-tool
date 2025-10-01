import { z } from 'zod';

export const settingsSchema = z.object({
  workspace: z.string()
    .min(1, 'Workspace name is required')
    .max(50, 'Workspace name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Workspace name can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  storage: z.string()
    .min(1, 'Storage location is required')
    .refine((val) => {
      // Basic path validation - should start with / or ~ or be a valid Windows path
      return /^(\/|~|[a-zA-Z]:)/.test(val);
    }, 'Please enter a valid storage path'),
  
  headlessMode: z.boolean(),
  
  autoSave: z.boolean(),
  
  screenshotOnFailure: z.boolean(),
  
  timeout: z.number()
    .min(1000, 'Timeout must be at least 1000ms')
    .max(300000, 'Timeout must be less than 5 minutes'),
  
  environments: z.object({
    development: z.string()
      .url('Development URL must be a valid URL')
      .optional()
      .or(z.literal('')),
    staging: z.string()
      .url('Staging URL must be a valid URL')
      .optional()
      .or(z.literal('')),
    production: z.string()
      .url('Production URL must be a valid URL')
      .optional()
      .or(z.literal('')),
  }),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

export const defaultSettings: SettingsFormData = {
  workspace: 'FlowTest Workspace',
  storage: '~/Documents/FlowTest',
  headlessMode: true,
  autoSave: true,
  screenshotOnFailure: true,
  timeout: 30000,
  environments: {
    development: '',
    staging: '',
    production: '',
  },
};
