import { z } from 'zod';

export const CreateKardexDto = z.object({
  fecha: z.string(),
  hora: z.string(),
  producto: z.string(),
  descripcion: z.string(),
  agente: z.string(),
  nombre: z.string(),
  inicial: z.number(),
  entrada: z.number(),
  salida: z.number(),
  final: z.number().optional(),
});

//se pone mismo nombre de la variable que se exporta porque se exporta una sola cosa y se pone el tipo de la variable
export type CreateKardexDto = z.infer<typeof CreateKardexDto>;
