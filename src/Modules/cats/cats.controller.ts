import { Response } from 'express';
import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../Models';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(): Promise<CreateCatDto[]> {
    return this.catsService.findAll();
  }

  @Post()
  async create(
    @Body() createCatDto: CreateCatDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.catsService.create(createCatDto);
    return {
      message: 'Object has been Created',
      statusCode: res.status(HttpStatus.OK).statusCode,
    };
  }
}
