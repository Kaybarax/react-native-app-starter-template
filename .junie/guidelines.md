# Project Guidelines

This document outlines the guidelines and best practices for working with this project.

## Project Overview

This is a React Native with TypeScript app starter template designed to provide a solid foundation for building mobile applications. The template follows a component-based architecture and includes:

- TypeScript for type safety
- Zustand for state management
- React Navigation for routing and navigation
- Organized folder structure for scalability
- Built-in components and utilities for common tasks

## Project Structure

The project follows a modular structure with clear separation of concerns:

- `app/` - Main application code
  - `App.tsx` - Main application component
  - `app-config.ts` - Application configuration
  - `app-entry.tsx` - Entry point for the app
  - `android-custom-native-modules/` - Custom native modules for Android
  - `app-dev-scratch-pad/` - Development scratch pad
  - `app-management/` - App management related code
  - `auth-and-security/` - Authentication and security related code
  - `controllers/` - Controllers for the app
  - `media/` - Media assets
  - `routing-and-navigation/` - Routing and navigation related code
  - `shared-components-and-modules/` - Shared components and modules
  - `stores/` - State management using Zustand
  - `theme/` - Theming related code
  - `util/` - Utility functions
  - `views/` - View components

- Keep components organized in their respective directories
- Follow the established patterns for state management using Zustand
- Place shared utilities in the appropriate utility folders

## Development Workflow

### Git Workflow

- Create feature branches from the main branch
- Use descriptive branch names (e.g., `feature/user-authentication`)
- Make small, focused commits with clear messages
- Submit pull requests for code review before merging

### Development Process

1. **Planning**: Understand requirements and plan implementation
2. **Development**: Write code following the project guidelines
3. **Testing**: Test your changes thoroughly
4. **Code Review**: Submit for code review and address feedback
5. **Merge**: Merge changes into the main branch after approval
6. **Deployment**: Deploy to the appropriate environment

## Setting Up Development Environment

### Prerequisites

- Node.js (version 16.0.0 or higher)
- pnpm (version 8.6.0 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Kaybarax/react-native-app-starter-template.git
   cd react-native-app-starter-template
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. For iOS development, install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Package Management

- **Use pnpm for node packages/libraries installations**
  - pnpm is the preferred package manager for this project
  - Do not use npm or yarn for package installations
  - Install pnpm globally: `npm install -g pnpm`
  - Install dependencies: `pnpm install`
  - Add new dependencies: `pnpm add [package-name]`
  - Add dev dependencies: `pnpm add -D [package-name]`

## Building for Development

### Running the App

- Start Metro bundler:
  ```bash
  pnpm start
  ```

- Run on Android:
  ```bash
  pnpm android
  ```

- Run on iOS:
  ```bash
  pnpm ios
  ```

### Debugging

- Use React Native Debugger for debugging
- Enable Chrome Developer Tools for debugging JavaScript
- Use Flipper for inspecting network requests, Redux state, and more

## Code Style Guidelines

### General Guidelines

- Follow the Prettier configuration defined in `.prettierrc`
- Use TypeScript for type safety
- Follow component-based architecture
- Write self-documenting code with clear variable and function names
- Keep components small and focused on a single responsibility
- Use functional components with hooks instead of class components
- Avoid deeply nested component hierarchies
- Use proper error handling

### Code Style

- Follow the project's ESLint and Prettier configurations
- Run linting before committing: `pnpm lint`
- Format code using: `pnpm format`

### Specific Formatting Rules

Based on the project's `.prettierrc` configuration:

- Maximum line length: 120 characters
- Tab width: 2 spaces
- Use spaces instead of tabs
- Use semicolons
- Use single quotes for strings
- Use trailing commas in multi-line structures
- Use parentheses around arrow function parameters only when necessary
- End of line: auto

## Testing

- Write tests for new features and bug fixes
- Run tests before submitting pull requests: `pnpm test`
- Use Jest for unit and integration testing
- Test components in isolation
- Mock external dependencies when necessary

## Deployment

- Follow the deployment checklist before releasing to production
- Use the provided scripts for building production-ready assets
- Ensure all tests pass before deployment
- Verify the app works correctly on both Android and iOS

## Documentation

- Update documentation when making significant changes
- Document complex logic and non-obvious code behavior
- Keep the README up to date
- Use JSDoc comments for functions and components
- Document props for components

## Performance Considerations

- Optimize bundle size by avoiding unnecessary dependencies
- Follow React Native performance best practices
- Profile and optimize rendering performance when needed
- Use memoization for expensive calculations
- Implement virtualized lists for long scrollable content
- Optimize images and assets

## Working with Junie

Junie is a tool that helps with project management and development workflow. When working with Junie:

- Before executing a junie task, first read `.junie/projectContext.md` to understand the current project context
- After executing a junie task, update `.junie/projectContext.md` accordingly
- Follow the guidelines in the `.junie` directory
- Use the provided templates for creating new components and features
- Submit issues and feature requests through the Junie interface
- Reference Junie tickets in commit messages when applicable
- Update Junie documentation as needed
