import { RmqConfig } from '../types';

export function createAwardConfig(): RmqConfig {
  return {
    exchange: "PostAwardsExchange",
    routingKey: "create-award",
    queue: "CreateAwardQueue"
  };
}
