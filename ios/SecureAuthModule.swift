import ExpoModulesCore

public class SecureAuthModule: Module {
  public func definition() -> ModuleDefinition {
    Name("SecureAuth")

    AsyncFunction("setSecret") { (key: String, value: String, options: SetSecretOptions, promise: Promise) in
      // TODO(charis): store `value` in the Keychain under `key`. When
      // options.requireAuthentication is set, attach SecAccessControl flags (see README
      // "Access control flags").
      promise.reject("NOT_IMPLEMENTED", "setSecret is not implemented on iOS yet")
    }

    AsyncFunction("getSecret") { (key: String, options: GetSecretOptions, promise: Promise) in
      // TODO(charis): read `key` from the Keychain, resolve nil when it is missing, and map
      // errSecUserCanceled / errSecAuthFailed / invalidated items to SecureAuthErrorCode values.
      promise.reject("NOT_IMPLEMENTED", "getSecret is not implemented on iOS yet")
    }

    AsyncFunction("deleteSecret") { (key: String, promise: Promise) in
      // TODO(charis): delete `key` from the Keychain; treat "not found" as success.
      promise.reject("NOT_IMPLEMENTED", "deleteSecret is not implemented on iOS yet")
    }

    AsyncFunction("authenticate") { (options: AuthenticateOptions, promise: Promise) in
      // TODO(charis): LAContext.evaluatePolicy with .deviceOwnerAuthenticationWithBiometrics, or
      // .deviceOwnerAuthentication when options.allowDeviceCredential is set; map LAError codes.
      promise.reject("NOT_IMPLEMENTED", "authenticate is not implemented on iOS yet")
    }
  }
}
