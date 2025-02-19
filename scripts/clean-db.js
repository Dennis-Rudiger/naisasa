const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Delete migrations folder
const migrationsPath = path.join(__dirname, '..', 'prisma', 'migrations');
if (fs.existsSync(migrationsPath)) {
  fs.rmSync(migrationsPath, { recursive: true, force: true });
  console.log('✔️ Deleted migrations folder');
}

// Drop database and recreate it
try {
  execSync('dropdb -U postgres naisasa --if-exists');
  console.log('✔️ Dropped existing database');
  
  execSync('createdb -U postgres naisasa');
  console.log('✔️ Created fresh database');
} catch (error) {
  console.error('Error managing database:', error.message);
}
