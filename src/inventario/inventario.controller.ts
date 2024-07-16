import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario';
import { UpdateInventarioDto } from './dto/update-inventario';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Controller('inventario')
export class InventarioController {
  constructor(
    private readonly inventarioService: InventarioService,
    private readonly websocketGateway: WebsocketGateway, // Se inyecta el WebSocketGateway
  ) {}

  // @Get()
  // holaMundo() {
  //   return this.inventarioService.holaMundo();
  // }

  @Get()
  getAll() {
    return this.inventarioService.getAll();
  }

  @Post()
  async create(@Body() body: CreateInventarioDto) {
    // sirve para validar el body con el schema de zod
    const validationResponse = CreateInventarioDto.safeParse(body);
    if (!validationResponse.success) {
      console.log(validationResponse.error.errors);
      throw new BadRequestException(
        validationResponse.error.errors.map((error) => error.message),
      );
    }
    try {
      const newInventario = await this.inventarioService.create(body);
      this.websocketGateway.server.emit('updateInventory', newInventario); // Emite el evento WebSocket y espera 
      // un objeto con la propiedad 'updateInventory' y el valor de newInventario
      return newInventario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateInventarioDto) {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número');
    }

    const validationResponse = UpdateInventarioDto.safeParse(body);
    if (!validationResponse.success) {
      console.log(validationResponse.error.errors);
      throw new BadRequestException(
        validationResponse.error.errors.map((error) => error.message),
      );
    }
    try {
      const updatedInventario = await this.inventarioService.update(id, body);
      this.websocketGateway.server.emit('updateInventory', updatedInventario); // Emite el evento WebSocket
      return updatedInventario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(204) // código de respuesta HTTP personalizado para el método delete
  async delete(@Param('id') id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número');
    }
    try {
      return await this.inventarioService.deleteOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
