Write-Host "🧹 Starting Prisma cleanup..."

# Remove migrations folder if it exists
$migrationsPath = "prisma\migrations"
if (Test-Path $migrationsPath) {
    Remove-Item -Path $migrationsPath -Recurse -Force
    Write-Host "✅ Removed migrations folder"
}

# Remove .prisma folder if it exists
$prismaPath = "node_modules\.prisma"
if (Test-Path $prismaPath) {
    Remove-Item -Path $prismaPath -Recurse -Force
    Write-Host "✅ Removed .prisma folder"
}

# Remove generated client
$clientPath = "node_modules\@prisma\client"
if (Test-Path $clientPath) {
    Remove-Item -Path $clientPath -Recurse -Force
    Write-Host "✅ Removed Prisma client"
}

Write-Host "✨ Cleanup complete! Now run:"
Write-Host "1. npx prisma generate"
Write-Host "2. npx prisma migrate dev --name init"
