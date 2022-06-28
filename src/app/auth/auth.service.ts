import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { tap } from 'rxjs/operators'

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface SigninCredentials {
  username: string;
  password: string;
}
interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninResponse{
  username:string
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // dollar sign is obersable
  // start as null we dont know if he signed in or not
  signedin$ = new BehaviorSubject(null);
username='';
  rootUrl = 'https://api.angular-email.com'
  // to handle any type of request
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {

    return this.http.post<{ avaliable: boolean }>
      (this.rootUrl + '/auth/username', {
        username: username
      })
  }
// ,{
  // withCredentials:true, obj makes requests is made and requests
  // cookies frmo server
  signUp(credentials: SignupCredentials) {
    return this.http.post<{ username: string }>
      (this.rootUrl + '/auth/signup',
        credentials).pipe(
        tap(({username}) => {
          this.signedin$.next(true);
          this.username=username;
        })
      )
  }
  checkAuth() {
    return this.http.get <SignedinResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({authenticated,username}) => {
        this.signedin$.next(authenticated);
        this.username=username;
      })
    )
  }
  signout() {
    // empty post request
    return this.http.post(this.rootUrl+'/auth/signout',{})
    .pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }
  signin(credentials:SigninCredentials) {
    return this.http.post<SigninResponse>(this.rootUrl+'/auth/signin',credentials)
    .pipe(
      tap (({username})=>{
        this.signedin$.next(true)
        this.username=username;
      })
    )
  }
}
