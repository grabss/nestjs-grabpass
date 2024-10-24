import { Test, TestingModule } from '@nestjs/testing';
import { NestjsGrabpassService } from './nestjs-grabpass.service';

describe('NestjsGrabpassService', () => {
  let service: NestjsGrabpassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsGrabpassService],
    }).compile();

    service = module.get<NestjsGrabpassService>(NestjsGrabpassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
