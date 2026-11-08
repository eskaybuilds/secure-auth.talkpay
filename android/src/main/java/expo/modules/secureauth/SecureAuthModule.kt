package expo.modules.secureauth

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SecureAuthModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SecureAuth")

    AsyncFunction("setSecret") { key: String, value: String, options: SetSecretOptions, promise: Promise ->
      // TODO(charis): encrypt `value` with an Android Keystore key and persist the ciphertext
      // under `key`. When options.requireAuthentication is set, create the key with
      // setUserAuthenticationRequired / setInvalidatedByBiometricEnrollment (see README).
      promise.reject("NOT_IMPLEMENTED", "setSecret is not implemented on Android yet", null)
    }

    AsyncFunction("getSecret") { key: String, options: GetSecretOptions, promise: Promise ->
      // TODO(charis): load and decrypt `key`, resolve null when it is missing, and map
      // KeyPermanentlyInvalidatedException to ENROLLMENT_CHANGED.
      promise.reject("NOT_IMPLEMENTED", "getSecret is not implemented on Android yet", null)
    }

    AsyncFunction("deleteSecret") { key: String, promise: Promise ->
      // TODO(charis): remove the ciphertext (and the Keystore key if it is per-secret);
      // treat "not found" as success.
      promise.reject("NOT_IMPLEMENTED", "deleteSecret is not implemented on Android yet", null)
    }

    AsyncFunction("authenticate") { options: AuthenticateOptions, promise: Promise ->
      // TODO(charis): BiometricPrompt on appContext.currentActivity (a FragmentActivity), with
      // BIOMETRIC_STRONG, or BIOMETRIC_STRONG or DEVICE_CREDENTIAL when options.allowDeviceCredential;
      // map BiometricPrompt error codes.
      promise.reject("NOT_IMPLEMENTED", "authenticate is not implemented on Android yet", null)
    }
  }
}
