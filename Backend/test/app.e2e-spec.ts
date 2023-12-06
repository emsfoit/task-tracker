import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TaskDto, TaskStatus } from '../src/task/dto';
import * as pactum from 'pactum';

const APP_URL = 'http://localhost:3334';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl(APP_URL);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  describe('Task', () => {
    const dto: TaskDto = {
      title: 'New Task',
      description: 'new task description',
      status: TaskStatus.OPEN,
    };

    describe('Create a task', () => {
      it('should create a task', () => {
        return pactum
          .spec()
          .post('/tasks')
          .withBody(dto)
          .expectStatus(201)
          .stores('taskId', 'id');
      });
    });

    describe('Get all tasks', () => {
      it('should get all tasks', () => {
        return pactum.spec().get('/tasks').expectStatus(200).inspect();
      });
    });

    describe('Get a task', () => {
      it('should get a task', () => {
        return pactum
          .spec()
          .get('/tasks/{taskId}')
          .withPathParams('taskId', '$S{taskId}')
          .expectStatus(200)
          .inspect();
      });
    });

    describe('update a task', () => {
      const dto: TaskDto = {
        title: 'New Task',
        description: 'new task description',
        status: TaskStatus.OPEN,
      };
      it('should update a task', () => {
        return pactum
          .spec()
          .patch('/tasks/{taskId}')
          .withPathParams('taskId', '$S{taskId}')
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Delete a task', () => {
      it('Should delete a task', () => {
        return pactum
          .spec()
          .delete('/tasks/{taskId}')
          .withPathParams('taskId', '$S{taskId}')
          .expectStatus(200);
      });
    });
  });
});
