import { Test, TestingModule } from '@nestjs/testing';

import { AuthCommands } from './auth.commands';
import { AppService } from './app.service';

describe('CountriesCommand', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthCommands],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AuthCommands>(AuthCommands);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
