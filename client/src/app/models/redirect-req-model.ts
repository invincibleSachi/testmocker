import { Headers } from './header-model';
export class RedirectRequestModel {
  uniqueName: string;
  serviceName: string;
  apiEndpointName: string;
  redirectUrl: string;
  authHeader: Headers;
  isActive: boolean;
  redirectEnabled: boolean;
  autoUpdateEnabled: boolean;
}
