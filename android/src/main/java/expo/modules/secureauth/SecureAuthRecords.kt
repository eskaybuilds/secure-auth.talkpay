package expo.modules.secureauth

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

// Mirrors of the option types in src/SecureAuth.types.ts. Field names must match the TS keys.

class SetSecretOptions : Record {
  @Field
  val requireAuthentication: Boolean = false
}

class GetSecretOptions : Record {
  @Field
  val promptMessage: String? = null
}

class AuthenticateOptions : Record {
  @Field
  val promptMessage: String = ""

  @Field
  val allowDeviceCredential: Boolean = false
}
