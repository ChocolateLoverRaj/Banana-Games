import Size from './types/Size'

const getScaledSize = (availableSize: Size, aspectRatio: Size): Size => {
  const maxScaleWidth = availableSize.width / aspectRatio.width
  const maxScaleHeight = availableSize.height / aspectRatio.height
  const scale = Math.min(maxScaleWidth, maxScaleHeight)
  return {
    width: aspectRatio.width * scale,
    height: aspectRatio.height * scale
  }
}

export default getScaledSize
