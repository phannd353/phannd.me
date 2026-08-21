import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { PostBaseDto } from './post-base.dto';

// DTO for response historical event
@Exclude()
export class PostBriefResponseDto extends PickType(PostBaseDto, [
  'id',
  'thumbnail',
  'title',
  'slug',
  'summary',
  'published',
  'authorId',
]) {
  @Expose()
  @ApiProperty({
    description: 'Thời gian cập nhật gần nhất của bài viết',
    example: '2026-08-20T10:15:00.000Z',
    format: 'date-time',
  })
  updatedAt?: string;

  @Expose()
  @ApiProperty({
    description: 'Thời gian tạo bài viết',
    example: '2026-08-20T09:00:00.000Z',
    format: 'date-time',
  })
  createdAt?: string;
}

@Exclude()
export class PostDetailResponseDto extends PostBriefResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Nội dung chi tiết của bài viết',
    example: 'Bài viết này mô tả cách triển khai API NestJS theo chuẩn…',
  })
  content!: string;
}
