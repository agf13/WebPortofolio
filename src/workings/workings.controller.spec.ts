import { Test, TestingModule } from '@nestjs/testing';
import { WorkingsController } from './workings.controller';

describe('WorkingsController', () => {
  let controller: WorkingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingsController],
    }).compile();

    controller = module.get<WorkingsController>(WorkingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
