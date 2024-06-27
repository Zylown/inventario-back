import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as moment from 'moment-timezone';

function formatDate() {
  return moment().tz('America/Lima').format('DD-MM-YYYY:HH:mm:ss');
}

@Schema({
  timestamps: {
    updatedAt: false, // deshabilita el campo updatedAt
  },
})
export class Inventario {
  @Prop({
    trim: true,
    type: Number,
    required: true,
    unique: true, // asegura que el ID sea único
  })
  id: number;

  @Prop({
    type: String,
    trim: true,
    required: true,
    strict: true,
  })
  categoria: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    strict: true,
  })
  producto: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    strict: true,
  })
  marca: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    strict: true,
  })
  estado: string;

  @Prop({
    type: Number,
    trim: true,
    required: true,
    strict: true,
  })
  stock: number;

  @Prop({
    type: Number,
    trim: true,
    required: true,
    strict: true,
  })
  precioC: number;

  @Prop({
    type: Number,
    trim: true,
    required: true,
    strict: true,
  })
  precioV: number;

  @Prop({ type: String, default: formatDate })
  createdAt: string;
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
