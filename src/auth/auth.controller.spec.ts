import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PartnersService } from '../partners/partners.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
          secretOrPrivateKey: 'secretKey',
        }),
      ],
    })
      .useMocker(async (token) => {
        if (token === PartnersService) {
          const encrypted = await bcrypt.hash('test', 12);
          const mockerPartner = {
            id: 1,
            name: 'test',
            description: 'test',
            email: 'test',
            password: encrypted,
            clients: [],
          };
          return {
            findOneByUsername: jest.fn((username: string) => {
              if (username === 'test') return mockerPartner;
            }),
          };
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should exist', () => {
      expect(controller.login).toBeDefined();
    });

    it('Should call service.login', async () => {
      const spy = jest.spyOn(service, 'login');
      await controller.login({ username: 'test', password: 'test' });
      expect(spy).toHaveBeenCalled();
    });

    it('Should throw an error if password is incorrect', async () => {
      await expect(
        controller.login({ username: 'test', password: 'wrongPassword' }),
      ).rejects.toThrow();
    });

    it('Should throw an error if user does not exist', async () => {
      await expect(
        controller.login({ username: 'wrongUser', password: 'test' }),
      ).rejects.toThrow();
    });

    it('Should return an access_token', async () => {
      expect(
        await controller.login({ username: 'test', password: 'test' }),
      ).toStrictEqual({ access_token: expect.any(String) });
    });
  });

  describe('getProfile', () => {
    it('should exist', () => {
      expect(controller.getProfile).toBeDefined();
    });
    it('should ensure the JwtAuthGuard is applied to the user method', async () => {
      const guards = Reflect.getMetadata('__guards__', controller.getProfile);
      const guard = new guards[0]();
      expect(guard).toBeInstanceOf(JwtAuthGuard);
    });

    it('should return a profile', () => {
      expect(controller.getProfile({ user: { name: 'test' } })).toStrictEqual({
        name: 'test',
      });
    });
  });
});
