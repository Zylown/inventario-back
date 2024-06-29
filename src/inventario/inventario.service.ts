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
    // Verificar si ya existe un producto con la misma combinación de categoria, producto y marca
    const existingInventario = await this.inventarioModel
      .findOne({
        categoria: createInventario.categoria,
        producto: createInventario.producto,
        marca: createInventario.marca,
      })
      .exec();

    if (existingInventario) {
      throw new Error(
        'Ya existe un producto con la misma combinación de categoria, producto y marca',
      );
    }

    // acá se debería generar el id del inventario de manera automática de 1 en 1
    const lastNumberInventario = await this.inventarioModel
      .findOne() // obtiene el último documento
      .sort({ id: -1 }) // ordena de manera descendente osea si tengo 0 y 1, me devolverá 1
      .exec(); // ejecuta la consulta

    // si lastNumberInventario es null, quiere decir que no hay registros en la base de datos y por lo tanto el id será 0
    const newId = lastNumberInventario ? lastNumberInventario.id + 1 : 0;

    createInventario.id = newId; // asigna el nuevo id al objeto que se va a guardar

     // Transformar el estado a mayúsculas y verificar que esté dentro de los valores permitidos
  if (createInventario.estado) {
    const estadoEnMayusculas = createInventario.estado.toUpperCase();
    if (estadoEnMayusculas !== 'ACTIVO' && estadoEnMayusculas !== 'INACTIVO') {
      throw new Error('El estado debe ser ACTIVO o INACTIVO');
    }
    createInventario.estado = estadoEnMayusculas as 'ACTIVO' | 'INACTIVO';
  }

    // acá se debería generar la fecha de creación de manera automática
    return await this.inventarioModel.create(createInventario);
  }

  async update(id: number, updateInventario: UpdateInventarioDto) {
    // Transformar el estado a mayúsculas y verificar que esté dentro de los valores permitidos
  if (updateInventario.estado) {
    const estadoEnMayusculas = updateInventario.estado.toUpperCase();
    if (estadoEnMayusculas !== 'ACTIVO' && estadoEnMayusculas !== 'INACTIVO') {
      throw new Error('El estado debe ser ACTIVO o INACTIVO');
    }
    updateInventario.estado = estadoEnMayusculas as 'ACTIVO' | 'INACTIVO';
  }
  
    return await this.inventarioModel.findOneAndUpdate(
      { id: id },
      updateInventario,
      {
        new: true,
      },
    );
  }

  async deleteOne(id: number) {
    return this.inventarioModel.findOneAndDelete({ id: id });
  }
}
