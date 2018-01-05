// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/do';
// import { Http, Response, Headers } from '@angular/http';
// import { NgRedux, RDXRootState } from '../../../store';
//
// const URL = 'http://api.spm-style.com';
//
// // let count = 0;
// //

// //
// // let random = function(){
// //   let min = Math.ceil(1);
// //   let max = Math.floor(6);
// //   return Math.floor(Math.random() * (max - min +1)) + min;
// // }
// //
// // @Injectable()
// // export class ApiPackagesService {
// //
// //   constructor(
// //     private _http:Http,
// //     private _redux:NgRedux<RDXRootState>
// //   ){}
// //
// //   private _error = (error:any):Observable<string> => {
// //     return Observable.throw(error.json().message);
// //   }
// //
// //   public getList = () => {
// //     count++;
// //     let headers = new Headers();
// //     headers.append('Content-Type', 'application/json');
// //     // if(this._nextCard < 60 && !this._isCalling && this._lastCall < new Date().getTime()){
// //       // this._isCalling = true;
// //     return this._http
// //     .get(`${URL}/packages-origin/list`, {headers, withCredentials: true})
// //     .map((res:Response) => res.json())
// //     .map((data) => {
// //       let tmp = [];
// //
// //       if(count <= 2){
// //         for(let i = 0; i < 30; i++){
// //           let device = Object.keys(devices)[random() - 1]
// //           let deviceSize = devices[device];
// //           tmp.push({
// //             ...data.res[0],
// //             iframe: i % 2 ? 'http://cdn.spm-style.com/overview/menu' : 'http://cdn.spm-style.com/overview/checkbox',
// //             // iframe: `http://cdn.spm-style.com/overview/${i}`,
// //             responsiveness: [{ name: device, size: deviceSize }]
// //           })
// //         }
// //       }else{
// //         for(let i = 0; i < 14; i++){
// //           let device = Object.keys(devices)[random() - 1]
// //           let deviceSize = devices[device];
// //           tmp.push({
// //             ...data.res[0],
// //             iframe: i % 2 ? 'http://cdn.spm-style.com/overview/menu' : 'http://cdn.spm-style.com/overview/checkbox',
// //             // iframe: `http://cdn.spm-style.com/overview/${i}`,
// //             responsiveness: [{ name: device, size: deviceSize }]
// //           })
// //         }
// //       }
// //       // this._nextCard = tmp.length + this._nextCard;
// //       return tmp;
// //     })
// //     .catch(this._error);
// //   }
//
// }
