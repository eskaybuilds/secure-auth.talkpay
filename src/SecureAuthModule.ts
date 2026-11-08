import { NativeModule, requireNativeModule } from 'expo';

import type { AuthenticateOptions, GetSecretOptions, SetSecretOptions } from './SecureAuth.types';

// The shape both SecureAuthModule.swift and SecureAuthModule.kt must expose.
// Nothing checks this against the native code: a mismatch fails at runtime.
declare class SecureAuthModule extends NativeModule {
  setSecret(key: string, value: string, options: SetSecretOptions): Promise<void>;
  getSecret(key: string, options: GetSecretOptions): Promise<string | null>;
  deleteSecret(key: string): Promise<void>;
  authenticate(options: AuthenticateOptions): Promise<void>;
}

export default requireNativeModule<SecureAuthModule>('SecureAuth');
