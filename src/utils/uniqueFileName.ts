function getFileExtension(filename: string): string {
    const ext = filename.split('.').pop();
    return ext ? `.${ext}` : '';
}

export function UniqueFileName(file: File | Buffer, type: 'video' | 'audio' = 'video') {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;

    // If it's a File object, use its name for extension
    if (file instanceof File) {
        return `${type}-${uniqueSuffix}${getFileExtension(file.name)}`;
    }

    // If it's a Buffer, use default extensions
    const defaultExtension = type === 'video' ? '.mp4' : '.mp3';
    return `${type}-${uniqueSuffix}${defaultExtension}`;
}