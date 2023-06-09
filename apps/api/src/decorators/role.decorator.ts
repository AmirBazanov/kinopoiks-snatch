import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Admin = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
