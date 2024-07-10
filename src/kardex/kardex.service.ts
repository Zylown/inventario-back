import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Kardex } from './schema/kardex.schema';
import { Model } from 'mongoose';
import { CreateKardexDto } from './dto/create-kardex';

@Injectable()
export class KardexService {
  // private es un modificador de acceso que indica que la variable solo puede ser accedida desde la misma clase
  constructor(@InjectModel(Kardex.name) private kardexModel: Model<Kardex>) {}

  async getAll() {
    return await this.kardexModel.find();
  }

  async create(createKardex: CreateKardexDto) {
    // que en final se ponga el valor de inicial + entrada - salida
    createKardex.final =
      createKardex.inicial + createKardex.entrada - createKardex.salida;
    return await this.kardexModel.create(createKardex);
  }

  async update(id: string, updateKardex: CreateKardexDto) {
    updateKardex.final =
      updateKardex.inicial + updateKardex.entrada - updateKardex.salida;
    return await this.kardexModel.findByIdAndUpdate(id, updateKardex, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.kardexModel.findByIdAndDelete(id);
  }
}
