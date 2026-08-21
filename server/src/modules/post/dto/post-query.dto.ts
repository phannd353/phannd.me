import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

// DTO for historical event query parameters
export class PostQueryDto {
  @ApiPropertyOptional({
    description: 'Số trang hiện tại',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Trang phải là số' })
  @IsPositive({ message: 'Trang phải là số dương' })
  page?: number;

  @ApiPropertyOptional({
    description: 'Số lượng bản ghi trên mỗi trang',
    example: 10,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Giới hạn phải là số' })
  @IsPositive({ message: 'Giới hạn phải là số dương' })
  limit?: number;

  @ApiPropertyOptional({
    description: 'Từ khóa tìm kiếm theo tiêu đề hoặc nội dung',
    example: 'nestjs',
  })
  @IsOptional()
  @IsString({ message: 'Từ khóa tìm kiếm phải là chuỗi' })
  search?: string;

  @ApiPropertyOptional({
    description: 'Trường dữ liệu để sắp xếp',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Trường sắp xếp phải là chuỗi' })
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Thứ tự sắp xếp',
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'Thứ tự sắp xếp phải là asc hoặc desc' })
  sortOrder?: 'asc' | 'desc';

  // Filter by author
  @ApiPropertyOptional({
    description: 'Lọc theo ID tác giả',
    example: 'd6e9f5d8-6be6-4bfe-8f13-29de6f4f2c11',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID tác giả không hợp lệ' })
  authorId?: string;

  // Filter by category
  @ApiPropertyOptional({
    description: 'Lọc theo danh sách ID danh mục',
    type: [String],
    example: ['b733b08a-46bd-4e85-bd60-ff9e789417c2'],
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((v) => v.trim());
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray({ message: 'Danh sách danh mục phải là mảng' })
  @IsUUID('4', { message: 'ID danh mục không hợp lệ' })
  categoryIds?: string[];

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái xuất bản',
    example: 'true',
  })
  @IsOptional()
  @IsBooleanString({ message: 'Trạng thái xuất bản phải là true hoặc false' })
  published?: string;

  // Filter by created date range
  @ApiPropertyOptional({
    description: 'Ngày tạo bắt đầu để lọc',
    example: '2026-08-01',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày tạo từ không hợp lệ' })
  createdAtFrom?: string;

  @ApiPropertyOptional({
    description: 'Ngày tạo kết thúc để lọc',
    example: '2026-08-31',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày tạo đến không hợp lệ' })
  createdAtTo?: string;

  // Filter by updated date range
  @ApiPropertyOptional({
    description: 'Ngày cập nhật bắt đầu để lọc',
    example: '2026-08-01',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày cập nhật từ không hợp lệ' })
  updatedAtFrom?: string;

  @ApiPropertyOptional({
    description: 'Ngày cập nhật kết thúc để lọc',
    example: '2026-08-31',
    format: 'date',
  })
  @IsOptional()
  @IsDateString({}, { message: 'Ngày cập nhật đến không hợp lệ' })
  updatedAtTo?: string;
}

export class PostQueryGrpcDto extends OmitType(PostQueryDto, [
  'createdAtFrom',
  'createdAtTo',
  'updatedAtFrom',
  'updatedAtTo',
  'published',
]) {
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  published?: boolean;

  @IsOptional()
  createdAtFrom?: Date;

  @IsOptional()
  createdAtTo?: Date;

  @IsOptional()
  updatedAtFrom?: Date;

  @IsOptional()
  updatedAtTo?: Date;
}
