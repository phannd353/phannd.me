import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { PostBaseDto } from './post-base.dto';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

@Exclude()
export class PostBaseCreateDto extends OmitType(PostBaseDto, [
  'id',
  'authorId',
  'publishedAt',
  'published',
  'views',
  'likes',
  'createdAt',
  'updatedAt',
]) {
  // Required in schema but optional through API
  @Expose()
  @ApiPropertyOptional({
    description: 'ID của tác giả viết bài',
    example: 'd6e9f5d8-6be6-4bfe-8f13-29de6f4f2c11',
    format: 'uuid',
    type: String,
  })
  @IsOptional()
  authorId?: PostBaseDto['authorId'];

  @Expose()
  @ApiPropertyOptional({
    description: 'Trạng thái xuất bản của bài viết',
    example: true,
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái xuất bản không hợp lệ' })
  published?: PostBaseDto['published'];
}

@Exclude()
export class PostBaseCreateGrpcDto extends OmitType(PostBaseCreateDto, []) { }
