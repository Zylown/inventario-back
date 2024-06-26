import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Inventario } from './schema/inventario.schema';
import { Model } from 'mongoose';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-inventario';
@Injectable()
export class InventarioService {
  constructor(
    @InjectModel(Inventario.name) private inventarioModel: Model<Inventario>,
  ) {}

  // async holaMundo() {
  //   return 'Hola Mundo desde el servicio de inventario';
  // }

  async getAll() {
    return await this.inventarioModel.find();
  }

  async create(createInventario: CreateInventarioDto) {
    return await this.inventarioModel.create(createInventario);
  }

  async update(id: string, updateInventario: UpdateInventarioDto) {
    return await this.inventarioModel.findByIdAndUpdate(id, updateInventario, {
      new: true,
    });
  }
}
