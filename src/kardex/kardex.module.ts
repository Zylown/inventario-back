import { Module } from '@nestjs/common';
import { KardexService } from './kardex.service';
import { KardexController } from './kardex.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Kardex, KardexSchema } from './schema/kardex.schema';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Kardex.name,
        schema: KardexSchema,
      },
    ]),
    WebsocketModule,
  ],
  providers: [KardexService],
  controllers: [KardexController],
})
export class KardexModule {}
