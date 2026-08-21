import { Logger } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let prisma: {
    post: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      findFirst: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
      count: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
    $transaction: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    prisma = {
      post: {
        create: vi.fn(),
        findUnique: vi.fn(),
        findFirst: vi.fn(),
        findMany: vi.fn(),
        count: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      $transaction: vi.fn(),
    };
    service = new PostService(prisma as never, new Logger());
  });

  it('creates a draft post for the authenticated author', async () => {
    prisma.post.create.mockResolvedValue({ id: 'post-id' });

    const result = await service.createPost('author-id', {
      title: 'A post',
      slug: 'a-post',
      content: 'Content',
    } as never);

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        title: 'A post',
        slug: 'a-post',
        content: 'Content',
        summary: undefined,
        thumbnail: undefined,
        authorId: 'author-id',
        categoryId: undefined,
        published: false,
      },
    });
    expect(result).toEqual({ id: 'post-id', success: true });
  });

  it('filters published posts and returns pagination metadata', async () => {
    const posts = [{ id: 'post-id', published: true }];
    prisma.post.findMany.mockReturnValue('find-many');
    prisma.post.count.mockReturnValue('count');
    prisma.$transaction.mockResolvedValue([posts, 11]);

    const result = await service.getPublishedPosts({
      page: 2,
      limit: 5,
      search: 'history',
      sortBy: 'title',
      sortOrder: 'asc',
    });

    expect(prisma.$transaction).toHaveBeenCalledWith(['find-many', 'count']);
    expect(prisma.post.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        published: true,
        OR: [
          { title: { contains: 'history', mode: 'insensitive' } },
          { slug: { contains: 'history', mode: 'insensitive' } },
          { content: { contains: 'history', mode: 'insensitive' } },
        ],
      }),
      orderBy: { title: 'asc' },
      skip: 5,
      take: 5,
    }));
    expect(result).toEqual({
      data: posts,
      pagination: { total: 11, totalPages: 3, page: 2, limit: 5 },
    });
  });

  it('finds a published post by slug', async () => {
    const post = { id: 'post-id', slug: 'a-post', published: true };
    prisma.post.findFirst.mockResolvedValue(post);

    await expect(service.findPostByIdOrSlug('a-post')).resolves.toEqual(post);
    expect(prisma.post.findFirst).toHaveBeenCalledWith({
      where: { slug: 'a-post', published: true },
    });
  });

  it('rejects deleting a post owned by another author', async () => {
    prisma.post.findUnique.mockResolvedValue({
      id: 'post-id',
      authorId: 'different-author',
    });

    await expect(service.deletePost('post-id', 'author-id'))
      .rejects.toThrow('You cannot delete this post');
    expect(prisma.post.delete).not.toHaveBeenCalled();
  });

  it('publishes a post with a publication timestamp', async () => {
    prisma.post.findUnique.mockResolvedValue({ id: 'post-id' });
    prisma.post.update.mockResolvedValue({ id: 'post-id' });

    await service.publishPost('post-id');

    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: 'post-id' },
      data: { published: true, publishedAt: expect.any(Date) },
    });
  });
});