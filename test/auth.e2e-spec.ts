import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('Authorization test', () => {
  const NUMBER_OF_JWT_TOKEN_PARTS = 3;
  const BODY_JWT_TOKEN_PART_INDEX = 1;

  let app: INestApplication;
  let httpServer: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => app.close());

  test('Test authorization with correct credentials', () => {
    const validEmail = 'jackstone@gmail.com';
    const validPassword = 'correcthorsebatterystaple'; // 🐎🔋🆗

    return request(httpServer)
      .post('/api/sign-in')
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(HttpStatus.OK)
      .expect(({ body }) => {
        expect(body).toHaveProperty('authToken');

        const { authToken } = body;
        const tokenParts = authToken.split('.');

        expect(tokenParts.length).toBe(NUMBER_OF_JWT_TOKEN_PARTS);

        const encodedBodyPart = tokenParts[BODY_JWT_TOKEN_PART_INDEX];
        const payload = JSON.parse(
          new Buffer(encodedBodyPart, 'base64').toString('utf8'),
        );

        expect(payload).toHaveProperty('email');

        const { email } = payload;

        expect(email).toBe(validEmail);
      });
  });

  test('Test authorization with incorrect credentials', () => {
    const invalidEmail = 'jackstone2@gmail.com';
    const invalidPassword = 'admin1';

    return request(httpServer)
      .post('/api/sign-in')
      .send({
        email: invalidEmail,
        password: invalidPassword,
      })
      .expect(HttpStatus.UNAUTHORIZED)
      .expect(({ body }) => {
        expect(body).toHaveProperty('error');
      });
  });
});
