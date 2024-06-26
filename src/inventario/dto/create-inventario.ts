import { z } from 'zod';

export const CreateInventarioDto = z.object({
  id: z.string(),
  categoria: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  producto: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  marca: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255),
  estado: z.enum(['activo', 'inactivo']),
  stock: z.number(),
  precioC: z.number(),
  precioV: z.number(),
});

CreateInventarioDto.required({
  id: true,
  categoria: true,
  producto: true,
  marca: true,
  stock: true,
  precioC: true,
  precioV: true,
});

export type CreateInventarioDto = z.infer<typeof CreateInventarioDto>;
