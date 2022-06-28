import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { EmailService } from '../email.service'
import { switchMap } from 'rxjs/operators'
import { Email } from '../email'
@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;
  // if u consle .log it will give behavior subject
  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.email = route.snapshot.data.email;
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    })
  }

  ngOnInit() {
    // sub to route behouvr subject called params
    // this.route.params.subscribe(({ id }) => {
    // give current id of page so /243g45h
    // to define each user id
    // console.log(snapshot)
    // no to this nested sub cause if u switch quick
    // u could send 2 request unordered
    //   this.emailService.getEmail(id).subscribe(email=>{
    //     console.log(email)
    //   })

    // this.route.params.pipe(
    // destructor id 
    // When a new inner 
    // Observable is emitted,
    //  switchMap stops emitting items
    //  from the earlier-emitted inner Observable 
    // and begins emitting items from the new one.
    //   switchMap(({ id }) => {
    //     return this.emailService.getEmail(id)
    //   })

    // ).subscribe((email) => {
    //   this.email=email;
    // });
  }
}