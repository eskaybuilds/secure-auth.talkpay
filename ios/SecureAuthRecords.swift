import ExpoModulesCore

// Mirrors of the option types in src/SecureAuth.types.ts. Field names must match the TS keys.

struct SetSecretOptions: Record {
  @Field var requireAuthentication: Bool = false
}

struct GetSecretOptions: Record {
  @Field var promptMessage: String?
}

struct AuthenticateOptions: Record {
  @Field var promptMessage: String = ""
  @Field var allowDeviceCredential: Bool = false
}
