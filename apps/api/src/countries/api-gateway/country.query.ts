import {Body, Controller, Get, HttpException, HttpStatus, Param,} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {AllCountriesContract, IdCountryContract, NameCountryContract} from '@kinopoisk-snitch/contracts';
import {getAllCountriesRMQConfig, getCountryByNameRMQConfig, getCountryRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateCountryDto} from "../dtos/create-country.dto";


@ApiTags('Countries')
@Controller('/countries')
export class CountryQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/getCountry/:id')
  @ApiOperation({ summary: 'Get Country' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateCountryDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Country not found' })
  async getCountryById(@Param('id') country_id: number) {
    if (isNaN(Number(country_id))) {
      throw new HttpException(
        'ID must be a number',
        HttpStatus.BAD_REQUEST
      );
    } else {
      return await this.amqpConnection.request<IdCountryContract.Response>({
        exchange: getCountryRMQConfig().exchange,
        routingKey: getCountryRMQConfig().routingKey,
        payload: country_id,
      });
    }
  }
  @Get('/getCountryName')
  @ApiOperation({ summary: 'Get Country by name' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateCountryDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Country not found' })
  async getCountryByName(@Body() name: NameCountryContract.Request) {
    return await this.amqpConnection.request<NameCountryContract.Response>({
        exchange: getCountryByNameRMQConfig().exchange,
        routingKey: getCountryByNameRMQConfig().routingKey,
        payload: name,
      });
  }
  @Get('/getAllCountries')
  @ApiOperation({ summary: 'Get Countries' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateCountryDto,
    isArray: true
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Country not found' })
  async getAllCountries() {
    return await this.amqpConnection.request<AllCountriesContract.Response>({
      exchange: getAllCountriesRMQConfig().exchange,
      routingKey: getAllCountriesRMQConfig().routingKey,
    });
  }
}
