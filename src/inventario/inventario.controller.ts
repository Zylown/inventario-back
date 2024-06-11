import { Controller, Get } from '@nestjs/common';
import { InventarioService } from './inventario.service';

@Controller('inventario')
export class InventarioController {
  constructor(private inventarioService: InventarioService) {}

  @Get()
  holaMundo() {
    return this.inventarioService.holaMundo();
  }
}
