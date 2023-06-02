import { RmqConfig } from '../types';

export const authRegisterRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'auth-register',
    exchange: 'AuthExchange',
    queue: 'RegisterAuthQueue',
  };
};

export const authLoginRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'auth-login',
    exchange: 'AuthExchange',
    queue: 'LoginAuthQueue',
  };
};

export const authGoogleRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'google-auth',
    exchange: 'AuthExchange',
    queue: 'GoogleAuthQueue',
  };
};

export const authVkRMQConfig = (): RmqConfig => {
  return {
    routingKey: 'vk-auth',
    exchange: 'AuthExchange',
    queue: 'VkAuthQueue',
  };
};
