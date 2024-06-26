import { Injectable } from '@nestjs/common';
import { CreateCatDto } from '../../Models';

@Injectable()
export class CatsService {
  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }
  findOne(id: number): CreateCatDto[] {
    return this.cats.filter((item) => item.id === id);
  }
}
