import { SECURE_AUTH_ERROR_CODES, type SecureAuthErrorCode } from './SecureAuth.types';

export class SecureAuthError extends Error {
  readonly code: SecureAuthErrorCode;

  constructor(code: SecureAuthErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'SecureAuthError';
    this.code = code;
  }
}

export function isSecureAuthError(error: unknown): error is SecureAuthError {
  return error instanceof SecureAuthError;
}

function isKnownCode(code: unknown): code is SecureAuthErrorCode {
  return typeof code === 'string' && (SECURE_AUTH_ERROR_CODES as readonly string[]).includes(code);
}

// expo-modules-core rejects with a CodedError whose `code` is whatever native passed to
// `promise.reject(code, …)`. Known codes become SecureAuthError; anything else is a bug
// on the native side and is rethrown untouched so it stays visible.
export function toSecureAuthError(error: unknown): unknown {
  if (error instanceof Error && 'code' in error && isKnownCode(error.code)) {
    return new SecureAuthError(error.code, error.message, { cause: error });
  }
  return error;
}
