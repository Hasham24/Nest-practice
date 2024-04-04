import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpException,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from '../../Models';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  async findAll(): Promise<CreateCatDto[]> {
    try {
      this.catsService.findAll();
    } catch (error) {
      console.log(error, 'error');
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.catsService.findAll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.catsService.create(createCatDto);
    return {
      message: 'Object has been Created',
      statusCode: res.status(HttpStatus.OK).statusCode,
    };
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
