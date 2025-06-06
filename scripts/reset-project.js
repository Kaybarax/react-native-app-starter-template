const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Resetting project...');

const rootDir = path.resolve(__dirname, '..');
const appDir = path.join(rootDir, 'app');
const appExampleDir = path.join(rootDir, 'app-example');

// Check if app directory exists
if (!fs.existsSync(appDir)) {
  console.error('Error: app directory does not exist.');
  process.exit(1);
}

// Check if app-example directory already exists
if (fs.existsSync(appExampleDir)) {
  console.log('app-example directory already exists. Removing it...');
  fs.rmSync(appExampleDir, { recursive: true, force: true });
}

// Create app-example directory
fs.mkdirSync(appExampleDir);

// Move all files from app to app-example
console.log('Moving files from app to app-example...');
const files = fs.readdirSync(appDir);
files.forEach(file => {
  const srcPath = path.join(appDir, file);
  const destPath = path.join(appExampleDir, file);
  fs.renameSync(srcPath, destPath);
});

// Create a new blank app directory with basic files
console.log('Creating new blank app directory...');

// Create _layout.tsx
fs.writeFileSync(
  path.join(appDir, '_layout.tsx'),
  `import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
`
);

// Create index.tsx
fs.writeFileSync(
  path.join(appDir, 'index.tsx'),
  `import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your new app!</Text>
      <Text style={styles.text}>Start building your app here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
`
);

console.log('Project reset complete!');
console.log('The starter code has been moved to the app-example directory.');
console.log('A new blank app directory has been created.');
console.log('You can now start developing your app in the app directory.');