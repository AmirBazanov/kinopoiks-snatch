import {Body, Controller, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreateCountryDto} from '../dtos/create-country.dto';
import {createCountryRMQConfig} from "@kinopoisk-snitch/rmq-configs";

import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BAD_REQUEST} from "@kinopoisk-snitch/constants";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/countries')
export class CountryCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createCountry')
  @ApiOperation({ summary: 'Create Country' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateCountryDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async createCountry(@Body() countryDto: CreateCountryDto) {
    try {
      await this.amqpConnection.publish(
        createCountryRMQConfig().exchange,
        createCountryRMQConfig().routingKey,
        countryDto,
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
