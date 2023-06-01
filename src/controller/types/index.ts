/**
 * Basic JSON response for Controller
 */
export type BasicResponse = {
  message: string;
};

/**
 * Error JSON response for Controller
 */
export type ErrorResponse = {
  error: string;
  message: string;
};

/**
 * Auth JSON response for Controller
 */
export type AuthResponse = {
  message: string,
  token: string,
}