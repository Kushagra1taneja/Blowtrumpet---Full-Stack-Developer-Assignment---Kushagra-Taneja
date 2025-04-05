import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: { findOne: jest.fn() }, // Mock user model
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn() }, // Mock JwtService with sign method
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const mockUser = { _id: '123', username: 'test', password: await bcrypt.hash('pass', 10) };
      userModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const token = await service.login('test', 'pass');
      expect(token).toBe('token');
      expect(jwtService.sign).toHaveBeenCalledWith({ userId: '123' }); // Verify payload
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userModel.findOne.mockResolvedValue(null); // No user found
      await expect(service.login('test', 'pass')).rejects.toThrow(UnauthorizedException);
      expect(jwtService.sign).not.toHaveBeenCalled(); // Ensure token isn’t generated
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockUser = { _id: '123', username: 'test', password: await bcrypt.hash('pass', 10) };
      userModel.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never); // Wrong password

      await expect(service.login('test', 'wrongpass')).rejects.toThrow(UnauthorizedException);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });
});