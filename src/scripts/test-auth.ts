import { createUser, verifyCredentials } from '../lib/auth/testUtils'

async function testAuth() {
  try {
    // Test user creation
    console.log('Creating test user...')
    const testUser = await createUser({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    })
    console.log('Test user created:', testUser)

    // Test credential verification
    console.log('\nTesting valid credentials...')
    const validUser = await verifyCredentials('test@example.com', 'password123')
    console.log('Valid credentials result:', !!validUser)

    // Test invalid password
    console.log('\nTesting invalid password...')
    const invalidPass = await verifyCredentials('test@example.com', 'wrongpass')
    console.log('Invalid password result:', !!invalidPass)

    // Test non-existent user
    console.log('\nTesting non-existent user...')
    const nonExistent = await verifyCredentials('fake@example.com', 'password123')
    console.log('Non-existent user result:', !!nonExistent)

  } catch (error) {
    console.error('Test failed:', error)
  }
}

testAuth()
