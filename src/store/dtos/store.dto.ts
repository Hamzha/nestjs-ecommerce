import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateStoreDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @MinLength(4)
  category: string;
}
