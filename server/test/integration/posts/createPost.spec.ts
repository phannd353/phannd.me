import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { INestApplication } from '@nestjs/common';

import { InfrastructureHelper } from '../helper/infrastructure.helper';
import { createTestingAppModule } from '../helper/app.helper';
import { UserWithRole } from 'better-auth/plugins';
import { ROLES, } from '@/lib/permissions';
import { AuthHelper } from '../helper/auth.helper';
import { PostService } from '@/modules/post/post.service';

describe('PostService integration', () => {
  let app: INestApplication;
  let infraHelper: InfrastructureHelper;
  let user: UserWithRole;
  const adminCredentials = {
    email: 'admin@example.com',
    password: 'adminpassword',
    role: ROLES.ADMIN,
  };
  const credentials = {
    email: 'test@example.com',
    password: 'password123',
    role: ROLES.USER,
  };

  beforeAll(async () => {
    infraHelper = new InfrastructureHelper();
    await infraHelper.startInfrastructure();

    app = await createTestingAppModule(infraHelper);

    const authHelper = app.get(AuthHelper);

    await authHelper.registerUser(adminCredentials);
    user = (await authHelper.registerUser(credentials)).user;
  }, 30000);

  afterAll(async () => {
    await app.close();
    await infraHelper.stopInfrastructure();
  });

  it('should successfully create a post', async () => {
    const postService = app.get(PostService);

    const result = await postService.createPost(user.id, {
      title: 'Integration post',
      slug: `integration-post-${Date.now()}`,
      content: 'Created through the PostService integration test.',
    });

    expect(result.success).toBe(true);
    expect(result.id).toEqual(expect.any(String));
  });
});
