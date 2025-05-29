// Script to enable Corepack and start the Expo app
const { execSync } = require('child_process');

try {
  console.log('Enabling Corepack...');
  execSync('corepack enable', { stdio: 'inherit' });
  
  console.log('Starting Expo app...');
  execSync('expo start', { stdio: 'inherit' });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}