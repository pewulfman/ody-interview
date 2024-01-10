import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as bcrypt from 'bcrypt';
import { DatabaseModule } from '../src/database/database.module';
import { PartnersModule } from '../src/partners/partners.module';
import { ClientsModule } from '../src/clients/clients.module';
import { ClientsController } from '../src/clients/clients.controller';
import { Partners } from '../src/partners/partners.entity';
import { Clients } from '../src/clients/clients.entity';
import { PartnersService } from '../src/partners/partners.service';
import { ClientsService } from '../src/clients/clients.service';
import { CreateClientDto } from '../src/clients/create-client.dto';

@Module({})
class MockDatabaseModule {}

export class MockPartnersService {
  readonly encrypted = bcrypt.hashSync('test', 12);
  readonly mockerPartner = {
    id: 1,
    name: 'test',
    description: 'test',
    email: 'test',
    password: this.encrypted,
    clients: [],
  };

  async findAll(): Promise<Partners[]> {
    return [this.mockerPartner];
  }

  async findOneByUsername(username: string): Promise<Partners | null> {
    if (username === 'test') return this.mockerPartner;
    else return null;
  }

  async findOneById(id: number): Promise<Partners | null> {
    if (id === 1) return this.mockerPartner;
    else return null;
  }
}

@Module({
  imports: [],
  providers: [PartnersService],
  exports: [PartnersService],
})
class MockPartnersModule {}

class MockClientsService {
  mockerClient: Clients[] = [];
  async findAll(): Promise<Clients[]> {
    return this.mockerClient;
  }

  async findAllWithPartner(partner: Partners) {
    return this.mockerClient
      .filter((client) => client.partner === partner)
      .map((client) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { partner, ...rest } = client;
        return rest;
      });
  }

  async create(
    createClientDto: CreateClientDto,
    partner: Partners,
  ): Promise<void> {
    const client = new Clients(createClientDto);
    client.partner = partner;
    this.mockerClient.push(client);
  }
}
@Module({
  imports: [PartnersModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
class MockClientsModule {}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PartnersService)
      .useClass(MockPartnersService)
      .overrideModule(PartnersModule)
      .useModule(MockPartnersModule)
      .overrideProvider(ClientsService)
      .useClass(MockClientsService)
      .overrideModule(ClientsModule)
      .useModule(MockClientsModule)
      .overrideModule(DatabaseModule)
      .useModule(MockDatabaseModule)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(302)
      .expect('Found. Redirecting to /docs');
  });

  it('GET /auth/profile without login should return 401', async () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('POST /auth/login should return token', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' })
      .expect(201);
  });

  it('POST /auth/login with wrong password should return 401', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'wrong' })
      .expect(406);
  });

  it('GET /auth/profile with login should return 200', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .expect(200);
  });

  it('GET /clients without login should return 401', async () => {
    return request(app.getHttpServer()).get('/clients').expect(401);
  });

  it('GET /clients with login should return 200', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    return request(app.getHttpServer())
      .get('/clients')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .expect(200)
      .expect([]);
  });

  it('POST /clients without login should return 401', async () => {
    return request(app.getHttpServer()).post('/clients').expect(401);
  });

  const body: CreateClientDto = {
    email: 'client1@gmail.com',
    language: 'french',
    countryOfOrigin: 'france',
    countryOfDestination: 'germany',
    travelDateStart: new Date(),
    travelDateEnd: new Date(),
  };

  it('POST /clients with login should return 201', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    return request(app.getHttpServer())
      .post('/clients')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .send(body)
      .expect(201);
  });

  it('POST /clients with login and wrong body should return 400', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    return request(app.getHttpServer())
      .post('/clients')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .send({})
      .expect(400);
  });

  it('GET /clients with login and client should return 200', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' });
    await request(app.getHttpServer())
      .post('/clients')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .send(body);
    return request(app.getHttpServer())
      .get('/clients')
      .set('Authorization', 'Bearer ' + resp.body.access_token)
      .expect(200)
      .expect([
        {
          ...body,
          travelDateStart: body.travelDateStart.toJSON(),
          travelDateEnd: body.travelDateEnd.toJSON(),
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
