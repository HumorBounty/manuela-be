/**
 * TODO: Update all any types
 */
export interface HttpRequest {
  path: string;
  method: any;
  pathParams: any;
  queryParams: any;
  headers: any;
  body: any;
  files?: any;
  existingFiles?: any;
}

export interface TokenDetails {
  userId?: string;
  accessToken?: string;
  email?: string;
  profileId?: string;
}

export interface ServiceRequest {
  id?: string;
  payload?: any;
  accessToken?: any;
}

// DB params types
export interface EditRequest {
  id: string | undefined;
  payload: any;
}

// Return param types
export interface ServiceResponse {
  res: any;
  err: any;
}

// TODO: change this to an interface and make it handle different service errors
type ServiceError = any;
