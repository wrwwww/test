
export interface ITableData{
    data:IMovie[][],
    idx:number,
    pageSize:number,
    raw:IMovie[],
}

export interface IMovie {
    _id?:string,
    movieName: string,
    movieImg?: string,
    movieDownload: string,
    movieMainPage: boolean,
    movieType?:EMovieType,
    uploadUserId?: string,

}

export enum EMovieType{
    film,
    tv,
    varietyShow,
    animation
}
