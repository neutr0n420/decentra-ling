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

export interface DubbedApiResponse {
    mesage: string,
    fileName: string,
    fileUrl: string,
    filePath: string,
    transcription: string,
    translationLanguage: string;
    translatedTranscript: {
        content: string;
    };
    dubbedAudioSpeechPath: string;
    DubbedVideoUrl: string,
    success: boolean;
}
export interface Props {
    value: string
}
export interface ReturnAPIData {
    message: string,
    success: boolean,
    data: {
        address: string,
        cids: string[],
    },
    updatedAt: string
}

export interface MakeAvailableForRentContractParams {
    cid: string,
    rentPrice: number,
    royaltyFeesPercentage: number
}
export interface RentVideoContractFunctionParams {
    cid: string,
    duration: number
}
export interface CidType {
    cid: string
}