import { Test, TestingModule } from '@nestjs/testing';
import { SurgeryService } from './surgery.service';

describe('SurgeryService', () => {
  let service: SurgeryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurgeryService],
    }).compile();

    service = module.get<SurgeryService>(SurgeryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
