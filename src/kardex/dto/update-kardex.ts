import { z } from 'zod';

export const UpdateKardexDto = z.object({
  fecha: z.string().optional(),
  hora: z.string().optional(),
  producto: z.string().optional(),
  descripcion: z.string().optional(),
  agente: z.string().optional(),
  nombre: z.string().optional(),
  inicial: z.number().optional(),
  entrada: z.number().optional(),
  salida: z.number().optional(),
  final: z.number().optional(),
});

//se pone mismo nombre de la variable que se exporta porque se exporta una sola cosa y se pone el tipo de la variable
export type UpdateKardexDto = z.infer<typeof UpdateKardexDto>;
