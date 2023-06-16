import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { FilterStoreDTO } from './dtos/filter-store.dto';
import { CreateStoreDTO } from './dtos/store.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Get('/')
  async getStores(
    @Req() request: Request,
    @Query() filterStoreDTO: FilterStoreDTO,
  ) {
    const user: object = request.user;

    console.log(user);
    if (Object.keys(filterStoreDTO).length) {
      const filterStores = this.storeService.getFilteredStores(filterStoreDTO);
      return filterStores;
    } else {
      const allProducts = await this.storeService.getAllStores();
      return allProducts;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addStore(@Body() createStoreDTO: CreateStoreDTO) {
    console.log('test');
    const store = await this.storeService.addStore(createStoreDTO);
    return store;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getStore(@Param('id') id: string) {
    const store = await this.storeService.getStore(id);
    return store;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteStore(@Param('id') id: string) {
    const store = await this.storeService.deleteStore(id);
    return store;
  }
}
