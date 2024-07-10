import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as moment from 'moment-timezone';

function formatDate() {
  return moment().tz('America/Lima').format('DD-MM-YYYY:HH:mm:ss');
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Kardex {
  @Prop({
    trim: true,
  })
  fecha: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  hora: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  producto: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  descripcion: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  agente: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  nombre: string;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  inicial: number;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  entrada: number;

  @Prop({
    trim: true,
    required: true,
    strict: true,
  })
  salida: number;

  @Prop({
    trim: true,
    strict: true,
  })
  final?: number;

  @Prop({
    type: String,
    default: formatDate,
  })
  createdAt: string;

  @Prop({
    type: String,
    default: formatDate,
  })
  updatedAt: string;
}

export const KardexSchema = SchemaFactory.createForClass(Kardex);

//Esto sirve para que cada vez que se cree un documento se actualice la fecha de creación
// Actualiza la fecha de actualización cada vez que se crea un documento
KardexSchema.pre('save', function (next) {
  this.updatedAt = formatDate();
  next();
});

// Actualiza la fecha de actualización cada vez que se actualiza un documento
KardexSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: formatDate() });
  next();
});
