import { Test, TestingModule } from '@nestjs/testing';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';

describe('SurgeryController', () => {
  let controller: SurgeryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurgeryController],
      providers: [SurgeryService],
    }).compile();

    controller = module.get<SurgeryController>(SurgeryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
