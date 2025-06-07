# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install pnpm (if not already installed)

   ```bash
   npm install -g pnpm
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm start
   ```

   > **Note:** If you encounter an error about packageManager and Corepack, use the following command instead:
   >
   > ```bash
   > pnpm start-with-corepack
   > ```
   >
   > This will enable Corepack and then start the app. Corepack is a tool included with Node.js that helps manage package managers.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
pnpm reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Git Workflow

This project follows a specific Git workflow for contributing changes:

1. Create a feature branch from the main branch
2. Make your changes and commit them
3. Push your feature branch to GitHub
4. Open a Pull Request against the main branch
5. Return to the main branch after creating the PR

We've provided a script to guide you through this process:

```bash
# Using pnpm
pnpm git-workflow

# Or directly with Node.js
node scripts/git-workflow.js
```

For more details, see the [Git Workflow Guide](scripts/GIT_WORKFLOW.md).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
