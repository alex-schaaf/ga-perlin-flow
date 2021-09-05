import p5 from "p5"
import "./styles.scss"

const sketch = (p: p5) => {
  p.setup = () => {
    const canvas = p.createCanvas(600, 600)
    canvas.parent("p5-canvas")

    p.stroke(255)
    p.strokeWeight(1)
    p.frameRate(60)
  }
  const generateParticles = (n: number, w: number, h: number): number[][] => {
    const particles: number[][] = []

    for (let i = 0; i < n; i++) {
      const particle = [Math.random() * w, Math.random() * h]
      particles.push(particle)
    }

    return particles
  }

  const dx = 15
  const dy = 15

  const particles = generateParticles(1000, 600, 600)
  const velocity = 0.1
  p.draw = () => {
    p.clear()
    // for (let x = dx; x < 600 - dx; x += dx) {
    //   for (let y = dy; y < 600 - dy; y += dy) {
    //     p.stroke(p.noise(x * 0.01, y * 0.01) * 255)
    //     // p.point(x, y)
    //     const X = Math.cos(p.noise(x * 0.01, y * 0.01) * Math.PI * 2) * dx
    //     const Y = Math.sin(p.noise(x * 0.01, y * 0.01) * Math.PI * 2) * dy
    //     p.line(x, y, x + X, y + Y)
    //   }
    // }

    particles.forEach((particle) => {
      if (particle[0] >= 600) {
        particle[0] = 0
      }
      if (particle[1] >= 600) {
        particle[1] = 1
      }

      const theta =
        p.noise(particle[0] * 0.01, particle[1] * 0.01, p.frameCount / 100) *
        Math.PI *
        2
      const X = Math.cos(theta) * dx
      const Y = Math.sin(theta) * dy

      p.stroke((theta / (Math.PI * 2)) * 255)

      particle[0] -= X * velocity + p.random() - 0.5
      particle[1] += Y * velocity + p.random() - 0.5
      p.point(particle[0], particle[1])
    })

    // if (p.frameCount % 100 === 0) {
    //   particles.forEach((particle) => {
    //     particle[0] += (p.random() - 0.5) * 5
    //     particle[1] += (p.random() - 0.5) * 5
    //   })
    // }
  }
}

new p5(sketch)
