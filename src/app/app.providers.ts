import { AuthGuard } from './auth.guard';

import {
  AssetDataService,
  MissionService,
  ExpandDataService,
  ClassDataService,
  UserService,
  AuthService,
  LicenseDataService
} from './services';

export const providers = [
  AuthGuard,
  AssetDataService,
  MissionService,
  ExpandDataService,
  ClassDataService,
  UserService,
  AuthService,
  LicenseDataService
];
