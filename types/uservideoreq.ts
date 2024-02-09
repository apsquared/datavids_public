import {UserVideoDef} from './uservideodef'


export type UserVideoRequest = {
    _id?: string,
    userid: string,
    status: VideoStatus,
    videoDef: UserVideoDef,
    requestTime?: Date ,
    startTime?:Date,
    completionTime?:Date,
    updateTime?:Date,
    videoUrl?:string,
    cost?:number,
    duration?:number,
    renderId?:string,
    bucketName?:string,
    errorMsg?:string,
    percComplete?:number,
}

export enum VideoStatus {

    QUEUED=1,
    INPROGRESS,
    COMPLETE,
    ERROR,
    SAVED,
    ARCHIVED,

}

export function getVideoStatusLabel(status: any): string {
    switch (status) {
        case VideoStatus.QUEUED:
            return "Queued";
        case VideoStatus.INPROGRESS:
            return "In Progress";
        case VideoStatus.COMPLETE:
            return "Complete";
        case VideoStatus.ERROR:
            return "Error";
        case VideoStatus.SAVED:
            return "Saved";
        case VideoStatus.ARCHIVED:
            return "Archived";
        default:
            return "Unknown Status";
    }
}