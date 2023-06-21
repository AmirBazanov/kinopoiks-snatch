import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
} from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateAwardDto } from '../dtos/create-award.dto';
import {
  createAwardConfig,
  deleteAwardConfig,
  editAwardConfig,
} from '@kinopoisk-snitch/rmq-configs';
import { EditAwardDto } from '../dtos/edit-award.dto';
import {AdminGuard} from "../../../guards/role.guard";
import {Admin} from "../../../decorators/role.decorator";

@UseGuards(AdminGuard)
@Admin()
@Controller('admin/awards')
export class AwardCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/createAward')
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

  @Delete('/deleteAward/:id')
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
