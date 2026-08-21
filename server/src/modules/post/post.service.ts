import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '@/infrastructure/database';

import {
  PostQueryDto,
  PostBaseCreateDto,
  PostBaseUpdateDto,
  PostBaseCreateGrpcDto,
  PostBaseUpdateGrpcDto,
  PostQueryGrpcDto,
} from './dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) { }

  async createPost(authorId: string, payload: PostBaseCreateDto) {
    const post = await this.prisma.post.create({
      data: {
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        summary: payload.summary,
        thumbnail: payload.thumbnail,
        authorId,
        categoryId: payload.categoryId,
        published: payload.published ?? false,
      },
    });

    return { id: post.id, success: true };
  }

  async getAllPosts(query: PostQueryDto) {
    return this.findPosts(query);
  }

  async getPublishedPosts(query: PostQueryDto) {
    return this.findPosts({ ...query, published: 'true' });
  }

  async findPostByIdOrSlug(id: string) {
    const post = this.isUuid(id)
      ? await this.prisma.post.findUnique({ where: { id } })
      : await this.prisma.post.findFirst({
        where: { slug: id, published: true },
      });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async updatePost(id: string, payload: PostBaseUpdateDto) {
    await this.getPost(id);

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        title: payload.title,
        slug: payload.slug,
        content: payload.content,
        summary: payload.summary,
        thumbnail: payload.thumbnail,
        categoryId: payload.categoryId,
        published: payload.published,
        publishedAt: payload.publishedAt
          ? new Date(payload.publishedAt)
          : payload.publishedAt === null ? null : undefined,
      },
    });

    return { id: post.id, success: true };
  }

  async deletePost(id: string, authorId: string) {
    const post = await this.getPost(id);
    if (post.authorId !== authorId) {
      throw new ForbiddenException('You cannot delete this post');
    }

    await this.prisma.post.delete({ where: { id } });
    return { id, success: true };
  }

  async publishPost(id: string) {
    await this.getPost(id);
    await this.prisma.post.update({
      where: { id },
      data: { published: true, publishedAt: new Date() },
    });

    return { id, success: true };
  }

  async unpublishPost(id: string) {
    await this.getPost(id);
    await this.prisma.post.update({
      where: { id },
      data: { published: false, publishedAt: null },
    });

    return { id, success: true };
  }

  private async getPost(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  private async findPosts(query: PostQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const where = {
      ...(query.published !== undefined && { published: query.published === 'true' }),
      ...(query.authorId && { authorId: query.authorId }),
      ...(query.categoryIds?.length && { categoryId: { in: query.categoryIds } }),
      ...(query.search && {
        OR: [
          { title: { contains: query.search, mode: 'insensitive' as const } },
          { slug: { contains: query.search, mode: 'insensitive' as const } },
          { content: { contains: query.search, mode: 'insensitive' as const } },
        ],
      }),
      ...this.dateRange('createdAt', query.createdAtFrom, query.createdAtTo),
      ...this.dateRange('updatedAt', query.updatedAtFrom, query.updatedAtTo),
    };

    const sortFields = new Set([
      'id', 'title', 'slug', 'views', 'likes', 'createdAt', 'updatedAt', 'publishedAt',
    ]);
    const sortBy = sortFields.has(query.sortBy ?? '') ? query.sortBy! : 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    const [data, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data,
      pagination: { total, totalPages: Math.ceil(total / limit), page, limit },
    };
  }

  private dateRange(field: 'createdAt' | 'updatedAt', from?: string, to?: string) {
    if (!from && !to) return {};
    return {
      [field]: {
        ...(from && { gte: new Date(from) }),
        ...(to && { lte: new Date(to) }),
      },
    };
  }

  private isUuid(value: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }
}
