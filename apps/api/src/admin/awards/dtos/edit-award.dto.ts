import {IsBoolean, IsDateString, IsNumber, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";


export class EditAwardDto {
  @ApiProperty({nullable:true})
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({nullable:true})
  @IsOptional()
  @IsDateString()
  year?: Date;
  @ApiProperty()


  @IsOptional()
  @IsString()
  nomination?: string;


  @ApiProperty({nullable:true})
  @IsOptional()
  @IsBoolean()
  is_eng?: boolean;
  @ApiProperty({nullable:true})


  @IsOptional()
  @IsNumber()
  person_id?: number;
  @ApiProperty({nullable:true})


  @IsOptional()
  @IsNumber()
  movie_id?: number;
}
