import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { InventarioController } from './inventario/inventario.controller';
import { InventarioModule } from './inventario/inventario.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Aquí se importan otros módulos
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    InventarioModule,
  ],
})
export class AppModule {}
