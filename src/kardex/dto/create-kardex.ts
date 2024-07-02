import { z } from 'zod';

export const CreateKardexDto = z.object({
  fecha: z.string().optional(),
  hora: z.string().optional(),
  producto: z.string().optional(),
  descripcion: z.string().optional(),
  agente: z.string().optional(),
  nombre: z.string().optional(),
  inicial: z.number(),
  entrada: z.number(),
  salida: z.number(),
  final: z.number(),
});

//se pone mismo nombre de la variable que se exporta porque se exporta una sola cosa y se pone el tipo de la variable
export type CreateKardexDto = z.infer<typeof CreateKardexDto>;
