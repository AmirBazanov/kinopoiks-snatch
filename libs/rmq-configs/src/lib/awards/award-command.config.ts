import { RmqConfig } from '../types';

export function createAwardConfig(): RmqConfig {
  return {
    exchange: 'PostAwardsExchange',
    routingKey: 'create-award',
    queue: 'CreateAwardQueue',
  };
}

export function editAwardConfig(): RmqConfig {
  return {
    exchange: 'PutAwardsExchange',
    routingKey: 'edit-award',
    queue: 'EditAwardQueue',
  };
}

export function deleteAwardConfig(): RmqConfig {
  return {
    exchange: 'DeleteAwardExchange',
    routingKey: 'delete-award',
    queue: 'DeleteAwardQueue',
  };
}
