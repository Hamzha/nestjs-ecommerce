import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
