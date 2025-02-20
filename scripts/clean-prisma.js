const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const cleanPrisma = () => {
  const prismaDir = path.join(__dirname, '..', 'node_modules', '.prisma')
  const clientDir = path.join(__dirname, '..', 'node_modules', '@prisma', 'client')

  // Remove Prisma directories
  if (fs.existsSync(prismaDir)) {
    fs.rmSync(prismaDir, { recursive: true, force: true })
    console.log('✔️ Removed .prisma directory')
  }

  if (fs.existsSync(clientDir)) {
    fs.rmSync(clientDir, { recursive: true, force: true })
    console.log('✔️ Removed @prisma/client directory')
  }

  // Run npm install and generate
  try {
    execSync('npm install', { stdio: 'inherit' })
    console.log('✔️ Reinstalled dependencies')
    
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✔️ Generated Prisma Client')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

cleanPrisma()
