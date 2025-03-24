import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyContactController } from './emergency-contact.controller';
import { EmergencyContactService } from './services/emergency-contact.service';

describe('EmergencyContactController', () => {
  let controller: EmergencyContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyContactController],
      providers: [EmergencyContactService],
    }).compile();

    controller = module.get<EmergencyContactController>(
      EmergencyContactController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
