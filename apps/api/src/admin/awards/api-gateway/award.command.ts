import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {CreateAwardDto} from '../dtos/create-award.dto';
import {createAwardConfig, deleteAwardConfig, editAwardConfig,} from '@kinopoisk-snitch/rmq-configs';
import {EditAwardDto} from '../dtos/edit-award.dto';
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BAD_REQUEST} from "@kinopoisk-snitch/constants";

@UseGuards(AdminGuard)
@UsePipes(new ValidationPipe())
@Admin()
@ApiTags('Admin')
@Controller('admin/awards')
export class AwardCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createAward')
  @ApiOperation({ summary: 'Create Award' })
  @ApiBody({ type: CreateAwardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateAwardDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async createAward(@Body() awardInfo: CreateAwardDto) {
    try {
      await this.amqpConnection.publish(
        createAwardConfig().exchange,
        createAwardConfig().routingKey,
        awardInfo
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Put('/editAward/:id')
  @ApiOperation({ summary: 'Edit Award' })
  @ApiBody({ type: EditAwardDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EditAwardDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: BAD_REQUEST })
  async editAwardById(
    @Body() awardInfo: EditAwardDto,
    @Param('id', ParseIntPipe) award_id: string
  ) {
    try {
      await this.amqpConnection.publish(
        editAwardConfig().exchange,
        editAwardConfig().routingKey,
        { awardInfo, award_id }
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  @Delete('/deleteAward/:id')@ApiOperation({ summary: 'Delete Award' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Award not found' })
  async deleteAwardById(@Param('id', ParseIntPipe) award_id: string) {
    try {
      await this.amqpConnection.publish(
        deleteAwardConfig().exchange,
        deleteAwardConfig().routingKey,
        award_id
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
