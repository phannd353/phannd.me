import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
  PostBaseCreateDto,
  PostBaseCreateGrpcDto,
} from './post-base-create.dto';
import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PostBaseDto } from './post-base.dto';

// DTO for updating historical event
export class PostBaseUpdateDto extends PartialType(PostBaseCreateDto) {
  @Expose()
  @ApiPropertyOptional({
    description: 'Thời gian bài viết được xuất bản',
    example: '2026-08-20T10:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  publishedAt?: PostBaseDto['publishedAt'];
}

export class PostBaseUpdateGrpcDto extends OmitType(PostBaseUpdateDto, [
  'publishedAt',
]) {
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  publishedAt?: Date | null;
}
