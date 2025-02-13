export interface UploadResponse {
    message: string,
    fileName: string,
    fileUrl: string,
    filePath: string,
    transcription: string,
    sucess: boolean
}
export interface translatedScriptInterface {
    content: string
}