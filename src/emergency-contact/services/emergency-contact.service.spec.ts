import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyContactService } from './services/emergency-contact.service';

describe('EmergencyContactService', () => {
  let service: EmergencyContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyContactService],
    }).compile();

    service = module.get<EmergencyContactService>(EmergencyContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
