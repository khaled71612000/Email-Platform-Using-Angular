import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service'
import { HomeComponent } from './home/home.component'
import { PlaceHolderComponent } from './place-holder/place-holder.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path:'not-found',
        component:NotFoundComponent
      },
      {
        //  anystring with id
        // /something random
        path: ':id', component: EmailShowComponent,
        // there is data called emailresolverserice
        // so run it get data then assign to email
        
        resolve: {
          email: EmailResolverService
        }
      },
      { path: '', component: PlaceHolderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
