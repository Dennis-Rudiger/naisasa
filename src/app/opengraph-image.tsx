import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Naisasa Events'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #7857FF, #2B2344)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              background: 'white',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
            }}
          >
            Naisasa Events
          </h1>
          <p
            style={{
              fontSize: 32,
              color: 'white',
              opacity: 0.8,
            }}
          >
            Discover Amazing Events in Kenya
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
