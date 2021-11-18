import { Models } from '@rematch/core';
import { storage } from './storage';
import { user } from './user';
import { route } from './route';
import { common } from './common';

export interface RootModel extends Models<RootModel> {
  common: typeof common;
  user: typeof user;
  route: typeof route;
  storage: typeof storage;
}
export const models: RootModel = {
  common,
  user,
  route,
  storage,
};
