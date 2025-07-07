export type CleanResizeDirection = 'width' | 'height';
export type CleanResizeHandlePosition = 'left' | 'right' | 'top' | 'bottom' | 'top left' | 'top right' | 'bottom left' | 'bottom right';
export type CleanResizePreset = 'all' | 'diagonal' | 'width' | 'height';

export const presets: Record<CleanResizePreset, CleanResizeHandlePosition[]> = {
    all: ['bottom', 'top', 'left', 'right', 'bottom left', 'bottom right', 'top left', 'top right'],
    diagonal: ['bottom left', 'bottom right', 'top left', 'top right'],
    width: ['left', 'right'],
    height: ['top', 'bottom']
};