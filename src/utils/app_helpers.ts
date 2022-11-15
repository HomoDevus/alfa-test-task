type RatioTypes = 'horizontal' | 'vertical' | 'squared'

export function getPictureRatio(width: number, height: number): RatioTypes {
    const layout = width > height ? 'horizontal' : 'vertical'
    let ratio

    if (layout === 'horizontal') {
        ratio = Math.ceil(width / height)
    } else {
        ratio = Math.ceil(height / width)
    }

    if (ratio >= 2) {
        return layout
    } else {
        return 'squared'
    }
}
