# @eskaybuilds/secure-auth

> **Status: scaffold.** The TypeScript API is typed; every native method still rejects with
> `NOT_IMPLEMENTED`. The package name is provisional and must be confirmed before any
> publish. `"private": true` in `package.json` blocks `npm publish` until then.

Keychain (iOS) and Keystore (Android) secret storage behind a biometric gate, as an
Expo module written in Swift and Kotlin.

## Why

<!-- TODO(charis): the problem (tokens in AsyncStorage / MMKV are readable on a rooted or
jailbroken device and end up in backups), why not expo-secure-store / react-native-keychain,
and what TalkPay uses it for. -->

## API

```ts
import {
  setSecret,
  getSecret,
  deleteSecret,
  authenticate,
  isSecureAuthError,
} from '@eskaybuilds/secure-auth';

await setSecret('session.refreshToken', token, { requireAuthentication: true });
const token = await getSecret('session.refreshToken', { promptMessage: 'Unlock TalkPay' }); // string | null
await deleteSecret('session.refreshToken');
await authenticate({ promptMessage: 'Confirm transfer', allowDeviceCredential: false });
```

| Function | Resolves | Notes |
|---|---|---|
| `setSecret(key, value, opts?)` | `void` | `opts.requireAuthentication` gates later reads behind biometrics |
| `getSecret(key, opts?)` | `string \| null` | `null` when nothing is stored; `opts.promptMessage` is shown in the system prompt |
| `deleteSecret(key)` | `void` | Deleting a missing key succeeds |
| `authenticate({ promptMessage, allowDeviceCredential? })` | `void` | Standalone biometric gate, no secret involved |

### Errors

Every rejection with a known code is a `SecureAuthError` with a typed `code`:

| Code | Meaning |
|---|---|
| `NOT_ENROLLED` | No biometrics enrolled (or no passcode set) |
| `LOCKED_OUT` | Too many failed attempts; biometrics are temporarily or permanently locked |
| `CANCELLED` | The user or the system dismissed the prompt |
| `ENROLLMENT_CHANGED` | Biometrics changed since the secret was stored, so the key is invalidated |
| `NOT_IMPLEMENTED` | The native method is still a stub |

```ts
try {
  await authenticate({ promptMessage: 'Confirm transfer' });
} catch (e) {
  if (isSecureAuthError(e) && e.code === 'CANCELLED') return;
  throw e;
}
```

## Design trade-offs

### Access control flags

<!-- TODO(charis): iOS kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly vs
WhenUnlockedThisDeviceOnly; SecAccessControl .biometryCurrentSet vs .biometryAny vs
.userPresence. Android setUserAuthenticationRequired + timeout vs per-use CryptoObject;
StrongBox. Which ones this module picks, and why. -->

### Invalidation on enrolment change

<!-- TODO(charis): .biometryCurrentSet / setInvalidatedByBiometricEnrollment(true) means
adding a fingerprint makes the secret unreadable (ENROLLMENT_CHANGED). Why that is right
for a wallet, and what the app must do next (re-login). -->

### Device-credential fallback

<!-- TODO(charis): what allowDeviceCredential changes on each platform (LAPolicy
.deviceOwnerAuthentication, BIOMETRIC_STRONG | DEVICE_CREDENTIAL); why it is off by
default for money movement; the Android API-level caveats. -->

### What is NOT protected

<!-- TODO(charis): the threat model's limits: a compromised JS bundle can call getSecret
itself; secrets are plain strings in JS memory once read; rooted/jailbroken devices;
backups; the simulator has no Secure Enclave. -->

## Example app

`example/` is an Expo app wired to this package through autolinking
(`expo.autolinking.nativeModulesDir: ".."`) and Metro `watchFolders`.

```bash
cd example
npm install
npm run ios      # or: npm run android
```

Each button calls one API and shows the resolved value or the error code.

## Testing

```bash
npm run lint
npm run typecheck            # module
npm run typecheck:example    # example app
npm test                     # Jest: JS error mapping with a mocked native module
CI=1 npm run build           # tsc → build/
```

<!-- TODO(charis): native unit tests (XCTest / JUnit), and the manual matrix: enrolled,
not enrolled, lockout, enrolment changed, cancel, passcode fallback, on both platforms. -->

See [docs/how-this-module-is-wired.md](docs/how-this-module-is-wired.md) for how the
Expo Modules API connects the TypeScript to Swift and Kotlin.
