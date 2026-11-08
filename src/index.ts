import type { AuthenticateOptions, GetSecretOptions, SetSecretOptions } from './SecureAuth.types';
import { toSecureAuthError } from './SecureAuthError';
import SecureAuthModule from './SecureAuthModule';

async function call<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    throw toSecureAuthError(error);
  }
}

export function setSecret(key: string, value: string, options: SetSecretOptions = {}): Promise<void> {
  return call(() => SecureAuthModule.setSecret(key, value, options));
}

/** Resolves `null` when nothing is stored under `key`. */
export function getSecret(key: string, options: GetSecretOptions = {}): Promise<string | null> {
  return call(() => SecureAuthModule.getSecret(key, options));
}

export function deleteSecret(key: string): Promise<void> {
  return call(() => SecureAuthModule.deleteSecret(key));
}

/** Shows the system biometric prompt. Resolves on success; rejects with a `SecureAuthError` otherwise. */
export function authenticate(options: AuthenticateOptions): Promise<void> {
  return call(() => SecureAuthModule.authenticate(options));
}

export { SecureAuthError, isSecureAuthError } from './SecureAuthError';
export * from './SecureAuth.types';
