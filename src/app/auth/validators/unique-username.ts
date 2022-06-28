import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import {map,catchError} from 'rxjs/operators'
import {AuthService} from '../auth.service'

@Injectable({ providedIn: 'root' })

export class UniqueUsername implements AsyncValidator{
    constructor(private authService:AuthService) {

    }
    // to make async implemnet u need valditae
    validate = (control:FormControl) => {
        const{ value } = control;

        // error or object true=null
        // also return username which is value
        // in object like api request "username":"khaled"
        return this.authService.usernameAvailable(value).pipe (
            map(()=>{
                // if weget successs request
                // it will pipe if so 
                // then return null 
                // instead when u return error it could say null
                // in form
                return null
            }),
            catchError((err)=>{
                if(err.error.username){
                    // of emits value like creating new boseravle
                    // if its in use
                    return of({nonUniqueUsername:true})
                }
                // in case no interent
                else {
                    return of({noConnection:true})

                }
            })
        )
    };
}
