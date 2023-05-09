import { Test, TestingModule } from '@nestjs/testing';

import { AppCommands } from './app.commands';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppCommands],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppCommands>(AppCommands);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
