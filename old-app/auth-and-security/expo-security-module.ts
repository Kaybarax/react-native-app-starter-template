/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import * as Crypto from 'expo-crypto';
import { showToast } from '../util/react-native-based-utils';

interface UserCredentials {
  password_hash: string;
  salt: string;
  [key: string]: any;
}

interface CallbackResListener {
  done: boolean;
  createPasswordHash?: boolean;
}

interface ValidatePasswordFeedback {
  done: boolean;
  isValidPassword?: boolean;
}

interface PasswordHashResponse {
  message: string;
  passwordHash?: string;
  passwordSalt?: string;
}

/**
 * Generate a random salt for password hashing
 * @returns {Promise<string>} A random salt as a hex string
 */
async function generateSalt(): Promise<string> {
  // Generate a random 16-byte salt
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hash a password with the given salt using SHA-256
 * @param {string} password - The password to hash
 * @param {string} salt - The salt to use
 * @returns {Promise<string>} The hashed password
 */
async function hashPassword(password: string, salt: string): Promise<string> {
  // Combine password and salt
  const combined = password + salt;
  // Hash using SHA-256
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, combined);
  return hash;
}

/**
 * Create a password hash and salt
 * @param {string} passwordText - The password to hash
 * @param {UserCredentials} userCredentials - Object to store the hash and salt
 * @param {CallbackResListener} callbackResListener - Callback object
 * @returns {Promise<UserCredentials>} The updated userCredentials object
 */
export async function createPasswordHash(
  passwordText: string,
  userCredentials: UserCredentials,
  callbackResListener: CallbackResListener,
): Promise<UserCredentials> {
  console.log('createPasswordHash');

  try {
    // Generate a random salt
    const salt = await generateSalt();

    // Hash the password with the salt
    const hash = await hashPassword(passwordText, salt);

    // Update the user credentials
    userCredentials.password_hash = hash;
    userCredentials.salt = salt;

    // Update the callback
    callbackResListener.done = true;
    callbackResListener.createPasswordHash = true;

    showToast('Password hashed successfully');
  } catch (error) {
    console.error('Error creating password hash:', error);
    callbackResListener.done = true;
    showToast('Password hashing failed');
  }

  return userCredentials;
}

/**
 * Validate a password against a stored hash and salt
 * @param {string} passwordToValidate - The password to validate
 * @param {string} hash - The stored hash
 * @param {string} salt - The stored salt
 * @param {ValidatePasswordFeedback} validatePasswordFeedback - Callback object
 */
export async function validatePasswordWithHashAndSalt(
  passwordToValidate: string,
  hash: string,
  salt: string,
  validatePasswordFeedback: ValidatePasswordFeedback,
): Promise<void> {
  console.log('validatePasswordWithHashAndSalt');

  try {
    // Hash the password with the stored salt
    const calculatedHash = await hashPassword(passwordToValidate, salt);

    // Compare the calculated hash with the stored hash
    const isValid = calculatedHash === hash;

    if (isValid) {
      showToast('Correct password');
      validatePasswordFeedback.isValidPassword = true;
    } else {
      showToast('Incorrect password');
    }

    validatePasswordFeedback.done = true;
  } catch (error) {
    console.error('Error validating password:', error);
    showToast('Password validation process failed');
    validatePasswordFeedback.done = true;
  }
}
