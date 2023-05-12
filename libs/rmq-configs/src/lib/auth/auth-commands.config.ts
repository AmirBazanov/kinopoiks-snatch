import { RmqConfig } from '../types';

export const authRegisterRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'auth-register',
    exchange: 'AuthExchange',
    queue: 'AuthQueue',
  };
};

export const authLoginRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'auth-login',
    exchange: 'AuthExchange',
    queue: 'AuthQueue',
  };
};
