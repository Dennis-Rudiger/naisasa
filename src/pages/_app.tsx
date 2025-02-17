import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import Layout from '../components/layout/Layout'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster position="bottom-right" />
    </SessionProvider>
  )
}

export default MyApp
