const { execSync } = require('child_process')

try {
  execSync('prisma generate', { stdio: 'inherit' })
} catch (error) {
  // If prisma generate fails, log the error but don't fail the installation
  console.error('Warning: Prisma generate failed, but continuing installation:', error.message)
}
