export class ApiEndpointModel {

  apiEndpointName: string;
  serviceName: string;
  uniqueName: string;
  apiYype: string;
  requestHeaders: Map<string, string>;
  requestQueryParams: Map<string, string>;
  responseHeaders: Map<string, string>;
  responseQueryParams: Map<string, string>;
  requestBody: {
    contentType: string;
    body: string;
    multipart: Map<string, string>;
  };
  responseBody: {
    contentType: string;
    body: string;
    multipart: Map<string, string>;
  };
}
