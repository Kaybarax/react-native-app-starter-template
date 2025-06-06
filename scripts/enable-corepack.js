const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

console.log('Enabling Corepack...');

try {
  // Check if corepack is available
  try {
    execSync('corepack --version', { stdio: 'ignore' });
    console.log('Corepack is already enabled.');
  } catch (error) {
    console.log('Enabling Corepack...');
    execSync('corepack enable', { stdio: 'inherit' });
    console.log('Corepack enabled successfully.');
  }

  // Start the app
  console.log('Starting the app...');
  execSync('expo start', { stdio: 'inherit' });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}