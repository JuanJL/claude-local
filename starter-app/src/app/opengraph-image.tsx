import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = "Juan's 34th Birthday — Save the Date"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF0E0 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 10 }}>🎉💃🎶</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#1D1D1D',
            marginBottom: 16,
          }}
        >
          Save the Date
        </div>
        <div
          style={{
            fontSize: 42,
            color: '#E63946',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Juan is turning 34!
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#6B5B4F',
            marginBottom: 40,
          }}
        >
          March 28, 2026 — Barcelona
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#6B5B4F',
            opacity: 0.7,
          }}
        >
          juanlacroix.com
        </div>
      </div>
    ),
    { ...size }
  )
}
