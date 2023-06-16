import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store, StoreDocument } from './schemas/store.schema';
import { FilterStoreDTO } from './dtos/filter-store.dto';
import { CreateStoreDTO } from './dtos/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async getFilteredStores(filteredStoreDTO: FilterStoreDTO): Promise<Store[]> {
    const search = filteredStoreDTO;
    const stores = await this.storeModel.find({ name: search });
    return stores;
  }

  async getAllStores(): Promise<Store[]> {
    return await this.storeModel.find();
  }

  async addStore(createStoreDTO: CreateStoreDTO) {
    const store = await this.storeModel.create(createStoreDTO);
    return store;
  }

  async getStore(id: string) {
    const store = await this.storeModel.findById(id);
    if (store) return store;
    throw new NotFoundException('Store does not exists');
  }

  async deleteStore(id: string) {
    const store = await this.storeModel.findByIdAndDelete({ _id: id });
    if (store) return store;
    throw new NotFoundException('Store does not exists');
  }
}
