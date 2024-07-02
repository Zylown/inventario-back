import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { KardexService } from './kardex.service';
import { CreateKardexDto } from './dto/create-kardex';

@Controller('kardex')
export class KardexController {
  constructor(private kardexService: KardexService) {}

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
      return await this.kardexService.create(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
