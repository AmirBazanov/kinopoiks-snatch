import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {UpdateCountryContract} from "@kinopoisk-snitch/contracts";
import {deleteCountryRMQConfig, updateCountryRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateCountryDto} from "../dtos/create-country.dto";

@UseGuards(AdminGuard)
@Admin()
@UsePipes(new ValidationPipe())
@ApiTags('Admin')
@Controller('admin/countries')
export class CountryEvent {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Put('/update/:id')
  @ApiOperation({ summary: 'Edit Country' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Country not found' })
  async updateGenre(@Param('id') country_id: number,
                    @Body() countryDto: CreateCountryDto) {
    if (isNaN(Number(country_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<UpdateCountryContract.Response>({
        exchange: updateCountryRMQConfig().exchange,
        routingKey: updateCountryRMQConfig().routingKey,
        payload: {country_id, ...countryDto},
      });
    }
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete Country' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Country not found' })
  async deleteCountry(@Param('id') country_id: number) {
    if (isNaN(Number(country_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request({
        exchange: deleteCountryRMQConfig().exchange,
        routingKey: deleteCountryRMQConfig().routingKey,
        payload: country_id,
      });
    }
  }
}
