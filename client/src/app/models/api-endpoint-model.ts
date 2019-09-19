import { ApiBody } from './body-model';
export class ApiEndpointModel {

  apiEndpointName: string;
  serviceName: string;
  uniqueName: string;
  apiType: string;
  requestHeaders: any;
  requestQueryParams: any;
  responseHeaders: any;
  requestBody: ApiBody;
  responseBody: ApiBody;
}
