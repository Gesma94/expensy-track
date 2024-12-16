import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const runCommand = (command, cwd) => {
  console.log(`Running: ${command} in ${cwd || 'current directory'}`);
  execSync(command, { stdio: 'inherit', cwd });
};

try {
  // Adjust the paths relative to the new location of deploy-bff.js
  const rootDir = resolve(import.meta.dirname, '../'); // Move up to the monorepo root

  console.log('Installing all dependencies...');
  runCommand('pnpm install', rootDir);

  console.log('Building common package...');
  runCommand('pnpm build', join(rootDir, 'packages/common'));

  console.log('Generating prisma client...');
  runCommand('pnpm generate', join(rootDir, 'packages/prisma'));

  console.log('Building prisma package...');
  runCommand('pnpm build', join(rootDir, 'packages/prisma'));

  console.log('Generating BFF graphql types...');
  runCommand('pnpm graphql-codegen', join(rootDir, 'apps/bff'));

  console.log('Building BFF...');
  runCommand('pnpm build', join(rootDir, 'apps/bff'));

  console.log('Deployment complete!');
} catch (error) {
  console.error('Error during deployment:', error.message);
  process.exit(1);
}
