import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Email } from './email'
import { EMPTY} from 'rxjs'
import { catchError } from 'rxjs/operators'
import { EmailService } from './email.service'

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    // resolve emitter
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        // u wont use data return
        return EMPTY;
      })
    )
  }
}
