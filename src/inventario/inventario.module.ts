import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventario, InventarioSchema } from './schema/inventario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventario.name,
        schema: InventarioSchema,
      },
    ]),
  ],
  providers: [InventarioService],
  controllers: [InventarioController],
})
export class InventarioModule {}
