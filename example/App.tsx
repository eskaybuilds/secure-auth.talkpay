import {
  authenticate,
  deleteSecret,
  getSecret,
  isSecureAuthError,
  setSecret,
} from '@eskaybuilds/secure-auth';
import { useState } from 'react';
import { Button, SafeAreaView, ScrollView, Text, View } from 'react-native';

const KEY = 'example.token';

export default function App() {
  const [result, setResult] = useState('Tap a button');

  async function run(label: string, fn: () => Promise<unknown>) {
    try {
      const value = await fn();
      setResult(`${label}: ok ${value === undefined ? '' : JSON.stringify(value)}`);
    } catch (error) {
      setResult(
        isSecureAuthError(error)
          ? `${label}: ${error.code} (${error.message})`
          : `${label}: unexpected ${String(error)}`
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>SecureAuth</Text>
        <Group name="Secrets">
          <Button
            title="setSecret (biometric-gated)"
            onPress={() =>
              run('setSecret', () => setSecret(KEY, 'hello', { requireAuthentication: true }))
            }
          />
          <Button
            title="getSecret"
            onPress={() => run('getSecret', () => getSecret(KEY, { promptMessage: 'Unlock the token' }))}
          />
          <Button title="deleteSecret" onPress={() => run('deleteSecret', () => deleteSecret(KEY))} />
        </Group>
        <Group name="Biometric gate">
          <Button
            title="authenticate"
            onPress={() => run('authenticate', () => authenticate({ promptMessage: 'Confirm it is you' }))}
          />
          <Button
            title="authenticate (allow passcode)"
            onPress={() =>
              run('authenticate', () =>
                authenticate({ promptMessage: 'Confirm it is you', allowDeviceCredential: true })
              )
            }
          />
        </Group>
        <Group name="Result">
          <Text accessibilityLiveRegion="polite">{result}</Text>
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: { fontSize: 30, margin: 20 },
  groupHeader: { fontSize: 20, marginBottom: 20 },
  group: { margin: 20, backgroundColor: '#fff', borderRadius: 10, padding: 20, gap: 8 },
  container: { flex: 1, backgroundColor: '#eee' },
};
