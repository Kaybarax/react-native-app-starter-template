/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import * as Linking from 'expo-linking';
import { notificationCallback } from './notification-center/notifications-controller';

/**
 * Open a web page using Expo's Linking API
 * @param {string} url - The URL to open
 * @param {any} notificationAlert - Notification alert object for feedback
 */
export async function openWebPageIntent(url: string, notificationAlert: any): Promise<void> {
  try {
    // Check if the URL can be opened
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      // Open the URL
      await Linking.openURL(url);
      notificationCallback('succ', 'Web page opened successfully', notificationAlert);
    } else {
      notificationCallback('warn', 'Cannot open this URL', notificationAlert);
    }
  } catch (error) {
    console.error('Error opening URL:', error);
    notificationCallback('err', 'Error opening web page', notificationAlert);
  }
}