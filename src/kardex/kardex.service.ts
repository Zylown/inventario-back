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
    return await this.kardexModel.create(createKardex);
  }

  async update(id: string, updateKardex: CreateKardexDto) {
    return await this.kardexModel.findByIdAndUpdate(id, updateKardex, {
      new: true,
    });
  }
}
