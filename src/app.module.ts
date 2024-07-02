import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { InventarioModule } from './inventario/inventario.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketModule } from './websocket/websocket.module';
import { KardexModule } from './kardex/kardex.module';

@Module({
  imports: [
    // Aquí se importan otros módulos
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    InventarioModule,
    WebsocketModule,
    KardexModule,
  ],
})
export class AppModule {}
