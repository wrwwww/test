import http from '@/utils/http'
import {moviesRanking} from "@/models/movies";
import {RouteRecordRaw} from "vue-router";
import {IMovie} from "@/components/admin/modules/movie";

export interface IUserRegister{
    username:string,
    password:string,
    email:string,
}
export interface IUserLogin{
    username:string,
    password:string,
}



export const getMovieRanking=async ()=>await http.get<moviesRanking[]>('/showRanking')
export const userLogin=async (data:IUserLogin)=>await http.post<IRespLogin>('user/login',data)
export const userRegister=async (data:IUserRegister)=>await http.post('/user/register',data)
export const allUsers=async ()=>await http.post<IUser[]>('/admin/users')
export const allMovies=async ()=>await http.post<IMovie[]>('/admin/movies')
export const getRoutes=async ()=>await http.post<RouteRecordRaw[]>('/admin/allRouters')
export const addMovie=async (movies:IMovie)=>await http.post<IMovie>('/admin/addMovie',movies)
export const delMovie=async (movieId:string)=>await http.post('/admin/delMovie', {movieId})
export const updateMovie=async (movieId:string,movieInfo:any)=>await http.post('/admin/updateMovie', {movieId,movieInfo})


export interface IRespLogin{
    token:string,
    user:IUser[],
}
export interface IUser {
    _id:string,
    username:string,
    email:string,
    [key:string]:string
}