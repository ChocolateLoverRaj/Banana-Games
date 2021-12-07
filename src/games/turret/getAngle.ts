const getAngle = (e: MouseEvent, canvas: HTMLCanvasElement, size: number): number => {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.x - size / 2
  const y = e.clientY - rect.top - size / 2
  return Math.atan2(y, x)
}

export default getAngle
