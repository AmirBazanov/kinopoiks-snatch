import { Module } from '@nestjs/common';
import {AwardModule} from "./awards/award.module";


@Module({
  imports:[AwardModule],
})
export class AdminModule {}
