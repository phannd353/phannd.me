import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
  Length,
  MinLength,
  IsUrl,
  Min,
  IsBoolean,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

// DTO for Post
@Exclude()
export class PostBaseDto {
  @Expose()
  @ApiProperty({
    description: 'ID duy nhất của bài viết',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Id không hợp lệ' })
  id!: string;

  @Expose()
  @ApiProperty({
    description: 'Tiêu đề của bài viết',
    example: 'Hướng dẫn xây dựng API NestJS chuyên nghiệp',
    maxLength: 255,
  })
  @IsString({ message: 'Tiêu đề không hợp lệ' })
  @Length(1, 255, { message: 'Độ dài tiêu đề phải từ 1 đến 255 ký tự' })
  @Transform(({ value }) => value?.trim())
  title!: string;

  @Expose()
  @ApiProperty({
    description: 'Slug dùng để tạo URL thân thiện cho bài viết',
    example: 'huong-dan-xay-dung-api-nestjs-chuyen-nghiep',
    maxLength: 255,
  })
  @IsString({ message: 'Slug không hợp lệ' })
  @Length(1, 255, { message: 'Slug phải từ 1 đến 255 ký tự' })
  @Transform(({ value }) => value?.trim())
  slug!: string;

  @Expose()
  @ApiProperty({
    description: 'Nội dung chi tiết của bài viết',
    example: 'Bài viết này giải thích cách tổ chức API NestJS…',
  })
  @IsString({ message: 'Nội dung không hợp lệ' })
  @MinLength(1, { message: 'Nội dung là bắt buộc' })
  @Transform(({ value }) => value?.trim())
  content!: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'Tóm tắt ngắn gọn của bài viết',
    example: 'Giới thiệu cách tổ chức project NestJS hiệu quả',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Tóm tắt không hợp lệ' })
  @Length(1, 500, { message: 'Tóm tắt phải từ 1 đến 500 ký tự' })
  @Transform(({ value }) => value?.trim())
  summary?: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'URL ảnh thumbnail của bài viết',
    example: 'https://images.example.com/post-thumbnail.jpg',
    format: 'url',
  })
  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail không hợp lệ' })
  @Transform(({ value }) => value?.trim())
  thumbnail?: string;

  @Expose()
  @ApiProperty({
    description: 'ID của tác giả viết bài',
    example: 'd6e9f5d8-6be6-4bfe-8f13-29de6f4f2c11',
    format: 'uuid',
  })
  @IsString({ message: 'ID tác giả không hợp lệ' })
  authorId!: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'ID danh mục của bài viết',
    example: 'b733b08a-46bd-4e85-bd60-ff9e789417c2',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID danh mục không hợp lệ' })
  categoryId?: string;

  @Expose()
  @ApiProperty({
    description: 'Số lượt xem của bài viết',
    example: 1240,
    minimum: 0,
  })
  @IsInt({ message: 'Số lượt xem không hợp lệ' })
  @Min(0, { message: 'Số lượt xem không được âm' })
  views!: number;

  @Expose()
  @ApiProperty({
    description: 'Số lượt thích của bài viết',
    example: 320,
    minimum: 0,
  })
  @IsInt({ message: 'Số lượt thích không hợp lệ' })
  @Min(0, { message: 'Số lượt thích không được âm' })
  likes!: number;

  @Expose()
  @ApiPropertyOptional({
    description: 'Trạng thái xuất bản của bài viết',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Trạng thái xuất bản không hợp lệ' })
  published!: boolean;

  @Expose()
  @ApiPropertyOptional({
    description: 'Thời gian bài viết được xuất bản',
    example: '2026-08-20T10:00:00.000Z',
    format: 'date-time',
  })
  @IsOptional()
  publishedAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Thời gian tạo bản ghi',
    example: '2026-08-20T09:00:00.000Z',
    format: 'date-time',
  })
  createdAt!: string;

  @Expose()
  @ApiProperty({
    description: 'Thời gian cập nhật gần nhất',
    example: '2026-08-20T10:15:00.000Z',
    format: 'date-time',
  })
  updatedAt!: string;
}
