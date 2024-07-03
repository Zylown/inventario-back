import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventario, InventarioSchema } from './schema/inventario.schema';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Inventario.name,
        schema: InventarioSchema,
      },
    ]),
    WebsocketModule,
  ],
  providers: [InventarioService],
  controllers: [InventarioController],
})
export class InventarioModule {}
