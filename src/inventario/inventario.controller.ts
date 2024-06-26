import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario';
import { Request } from 'express';

@Controller('inventario')
export class InventarioController {
  constructor(private inventarioService: InventarioService) {}

  // @Get()
  // holaMundo() {
  //   return this.inventarioService.holaMundo();
  // }

  @Get()
  getAll() {
    return this.inventarioService.getAll();
  }

  @Post()
  async create(@Body() body: CreateInventarioDto, @Req() req: Request) {
    // sirve para validar el body con el schema de zod
    const validationResponse = CreateInventarioDto.safeParse(body);
    if (!validationResponse.success) {
      console.log(validationResponse.error.errors);
      throw new BadRequestException(
        validationResponse.error.errors.map((error) => error.message),
      );
    }
    try {
      return await this.inventarioService.create(body);
    } catch (error) {}
  }
}
