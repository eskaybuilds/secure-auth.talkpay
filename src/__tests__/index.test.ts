import { authenticate, deleteSecret, getSecret, isSecureAuthError, setSecret } from '..';

function mockCodedError(code: string) {
  return Object.assign(new Error(`${code} from native`), { code });
}

jest.mock('expo', () => {
  const reject = (code: string) => () => Promise.reject(mockCodedError(code));
  return {
    NativeModule: class {},
    requireNativeModule: () => ({
      setSecret: reject('NOT_IMPLEMENTED'),
      getSecret: reject('NOT_IMPLEMENTED'),
      deleteSecret: reject('NOT_IMPLEMENTED'),
      authenticate: reject('ERR_SOMETHING_ELSE'),
    }),
  };
});

describe('native rejections', () => {
  it.each([
    ['setSecret', () => setSecret('k', 'v')],
    ['getSecret', () => getSecret('k')],
    ['deleteSecret', () => deleteSecret('k')],
  ])('%s maps NOT_IMPLEMENTED to SecureAuthError', async (_name, call) => {
    const error = await call().catch((e: unknown) => e);
    expect(isSecureAuthError(error)).toBe(true);
    expect(error).toMatchObject({ code: 'NOT_IMPLEMENTED' });
  });

  it('passes unknown codes through untouched', async () => {
    const error = await authenticate({ promptMessage: 'x' }).catch((e: unknown) => e);
    expect(isSecureAuthError(error)).toBe(false);
    expect(error).toMatchObject({ code: 'ERR_SOMETHING_ELSE' });
  });
});
