import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Controller('kardex')
export class KardexController {
  constructor(
    private kardexService: KardexService,
    private readonly WebsocketGateway: WebsocketGateway,
  ) {}

  @Get()
  getAll() {
    return this.kardexService.getAll();
  }

  @Post()
  async create(@Body() body: CreateKardexDto) {
    const validationResponse = CreateKardexDto.safeParse(body);
    if (!validationResponse.success) {
      console.log(validationResponse.error.errors);
      throw new BadRequestException(
        validationResponse.error.errors.map((error) => error.message),
      );
    }

    try {
      const kardex = await this.kardexService.create(body);
      this.WebsocketGateway.server.emit('updateKardex', kardex);
      return kardex;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: CreateKardexDto) {
    const validationResponse = CreateKardexDto.safeParse(body);
    if (!validationResponse.success) {
      console.log(validationResponse.error.errors);
      throw new BadRequestException(
        validationResponse.error.errors.map((error) => error.message),
      );
    }

    try {
      const kardex = await this.kardexService.update(id, body);
      this.WebsocketGateway.server.emit('updateKardex', kardex);
      return kardex;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
