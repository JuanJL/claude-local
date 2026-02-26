import confetti from 'canvas-confetti'

export function fireJackpotConfetti() {
  const duration = 3000
  const end = Date.now() + duration

  const colors = ['#E63946', '#FFD700', '#2A9D8F', '#F4A261']

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }
  frame()
}

export function fireBurst() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#E63946', '#FFD700', '#2A9D8F', '#F4A261', '#FFF8F0'],
    scalar: 1.2,
  })
}
