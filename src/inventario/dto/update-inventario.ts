import { z } from 'zod';

export const UpdateInventarioDto = z.object({
  id: z.number().optional(),
  categoria: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255)
    .optional(),
  producto: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255)
    .optional(),
  marca: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255)
    .optional(),
  tamanio: z
    .string()
    .min(1, { message: 'El nombre debe tener al menos 1 caracteres' })
    .max(255)
    .optional(),
  stock: z.number().optional(),
  precioC: z.number().optional(),
  precioV: z.number().optional(),
});

export type UpdateInventarioDto = z.infer<typeof UpdateInventarioDto>;
