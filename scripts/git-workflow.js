const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Git Workflow Script
 * 
 * This script guides you through the Git workflow for this project:
 * 1. Committing changes
 * 2. Pushing a feature branch to GitHub
 * 3. Opening a Pull Request against the main branch
 * 4. Returning to the main branch
 */

console.log('\n=== Git Workflow Guide ===\n');

// Function to execute a command and return its output
function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Function to prompt for user input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main workflow function
async function gitWorkflow() {
  try {
    // Display current status
    console.log('Current Git Status:');
    console.log(runCommand('git status'));
    
    // Step 1: Commit changes
    console.log('\n=== Step 1: Commit Changes ===');
    console.log('Files to be committed:');
    
    const filesToAdd = await prompt('Enter files to add (space-separated, or "." for all): ');
    runCommand(`git add ${filesToAdd}`);
    
    console.log('\nFiles staged for commit:');
    console.log(runCommand('git status --short'));
    
    const commitMessage = await prompt('\nEnter a descriptive commit message: ');
    runCommand(`git commit -m "${commitMessage}"`);
    console.log('Changes committed successfully!');
    
    // Step 2: Push a feature branch to GitHub
    console.log('\n=== Step 2: Push Feature Branch to GitHub ===');
    const currentBranch = runCommand('git branch --show-current').trim();
    console.log(`Current branch: ${currentBranch}`);
    
    const shouldPush = await prompt('Do you want to push this branch to GitHub? (y/n): ');
    if (shouldPush.toLowerCase() === 'y') {
      console.log(`Pushing branch ${currentBranch} to GitHub...`);
      runCommand(`git push -u origin ${currentBranch}`);
      console.log('Branch pushed successfully!');
    }
    
    // Step 3: Open a Pull Request
    console.log('\n=== Step 3: Open a Pull Request ===');
    const shouldCreatePR = await prompt('Do you want to create a Pull Request? (y/n): ');
    if (shouldCreatePR.toLowerCase() === 'y') {
      // Check if GitHub CLI is installed
      try {
        runCommand('gh --version');
        
        const prTitle = await prompt('Enter PR title: ');
        const prBody = await prompt('Enter PR description: ');
        const baseBranch = await prompt('Enter base branch (default: main): ') || 'main';
        
        console.log('Creating Pull Request...');
        runCommand(`gh pr create --base ${baseBranch} --head ${currentBranch} --title "${prTitle}" --body "${prBody}"`);
        console.log('Pull Request created successfully!');
      } catch (error) {
        console.error('GitHub CLI not found. Please install it to create PRs from the terminal.');
        console.log('Installation instructions: https://github.com/cli/cli#installation');
      }
    }
    
    // Step 4: Return to the main branch
    console.log('\n=== Step 4: Return to Main Branch ===');
    const targetBranch = await prompt('Enter the branch to checkout (default: main): ') || 'main';
    
    const shouldCheckout = await prompt(`Do you want to checkout the ${targetBranch} branch? (y/n): `);
    if (shouldCheckout.toLowerCase() === 'y') {
      console.log(`Checking out ${targetBranch} branch...`);
      runCommand(`git checkout ${targetBranch}`);
      console.log(`Now on branch: ${runCommand('git branch --show-current').trim()}`);
    }
    
    console.log('\n=== Git Workflow Complete ===');
  } catch (error) {
    console.error('An error occurred during the Git workflow:');
    console.error(error.message);
  } finally {
    rl.close();
  }
}

// Run the workflow
gitWorkflow();