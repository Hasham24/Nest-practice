import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatDto } from '../../Models';
@Controller('cats')
export class CatsController {
  @Get(':id')
  findAll(@Param() params: any): string {
    return `This action returns a #${params.id} cat`;
  }
  @Post()
  async create(
    @Body() createCatDto: CreateCatDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return {
      cat: createCatDto,
      message: 'This action adds a new cat',
      statusCode: res.status(HttpStatus.CREATED).statusCode,
    };
  }
}
