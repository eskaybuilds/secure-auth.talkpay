/**
 * Every code the native side may reject with. Swift and Kotlin must use these exact
 * strings in `promise.reject(code, message)` so `SecureAuthError.code` narrows.
 */
export type SecureAuthErrorCode =
  | 'NOT_ENROLLED'
  | 'LOCKED_OUT'
  | 'CANCELLED'
  | 'ENROLLMENT_CHANGED'
  | 'NOT_IMPLEMENTED';

export const SECURE_AUTH_ERROR_CODES: readonly SecureAuthErrorCode[] = [
  'NOT_ENROLLED',
  'LOCKED_OUT',
  'CANCELLED',
  'ENROLLMENT_CHANGED',
  'NOT_IMPLEMENTED',
];

export type SetSecretOptions = {
  /**
   * Gate reads of this secret behind biometrics (Keychain access control on iOS,
   * a Keystore key with `setUserAuthenticationRequired` on Android).
   */
  requireAuthentication?: boolean;
};

export type GetSecretOptions = {
  /** Shown in the system biometric prompt when the secret was stored with `requireAuthentication`. */
  promptMessage?: string;
};

export type AuthenticateOptions = {
  promptMessage: string;
  /** Allow the device passcode / PIN / pattern as a fallback when biometrics fail or are unavailable. */
  allowDeviceCredential?: boolean;
};
