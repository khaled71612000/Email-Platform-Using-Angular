import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap,filter } from 'rxjs/operators'

@Injectable()
// Interceptors are a unique type of Angular Service 
// that we can implement. Interceptors allow us
//  to intercept incoming or outgoing HTTP requests 
//  using the HttpClient . By intercepting the HTTP request, 
// we can modify or change the value of the request.
// omplment httpinterceptory to edit request configure
// req is object that has info like url etc
// next is wiring differenct interceports togeteher
// and return observalbe
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // req.withCredentials = true; cant cause its only read only
        // make req with credtionals
        const modifiedReq = req.clone({
            withCredentials: true,
        })
        return next.handle(modifiedReq).pipe(
            // not reponse type or anytype but sent
// filter (val => val.type === HttpEventType.Sent),
//             tap(val => {
//             console.log('request sent')
//         })
        ) 
    }

}
