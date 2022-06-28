import { Component, Input, OnInit } from '@angular/core';
import {Email} from '../email'
import {EmailService} from '../email.service'

@Component({
  selector: 'app-email-replay',
  templateUrl: './email-replay.component.html',
  styleUrls: ['./email-replay.component.css']
})
export class EmailReplayComponent {
  showModal = false;
 @Input() email:Email;
  
  constructor(private emailService:EmailService) { }

  ngOnChanges(): void {
    // ever new line in string replace with new line >
    const text =this.email.text.replace(/\n/gi,'\n> ');
    this.email = {
      // take all proprites
      ...this.email,
      from: this.email.to,
      to:this.email.from,
      subject: `RE: ${this.email.subject}`,
      text:`\n\n\n-------- ${this.email.from} wrote:\n> ${text}`
    }
  }
  onSubmit(email:Email) {
    this.emailService.sendEmail(email).subscribe(()=>{
this.showModal=false;

    })
  }

}
