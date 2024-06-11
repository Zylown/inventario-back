import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventario } from './schema/inventario.schema';
import { Model } from 'mongoose';
@Injectable()
export class InventarioService {
  constructor(
    @InjectModel(Inventario.name) private inventarioModel: Model<Inventario>,
  ) {}

  async holaMundo() {
    return 'Hola Mundo desde el servicio de inventario';
  }
}
