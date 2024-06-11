import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Inventario {
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
}

export const InventarioSchema = SchemaFactory.createForClass(Inventario);
