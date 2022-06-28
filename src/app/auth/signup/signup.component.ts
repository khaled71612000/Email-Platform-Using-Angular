import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatchPassword } from '../validators/match-password'
import { UniqueUsername } from '../validators/unique-username'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({

    // first is valueof form control , them sync valdirots
    // then async valdirotrs
    // async dont run until sync is done cause he knwos it takes time
    // like most of them make http requests
    // u pass refernce this.unque.valdiate
    // so bind func to class using unqie
    username: new FormControl('', [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),]),
    passwordConfirmation: new FormControl('', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),]),

  }, { validators: [this.matchPassword.validate] })
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router:Router

  ) { }

  ngOnInit(): void {
  }

  // if invalid dont submit
  // if valid make signupmehod and return obeservable
  // and subscribe
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signUp(this.authForm.value)
      .subscribe({
        next : response => {
          this.router.navigateByUrl('/inbox')
        },
        error : err => {
          // if errors happened when subbmiting
          if (err.status===0){
            this.authForm.setErrors({noConnection:true})
          }
          else {
            this.authForm.setErrors({unknownError:true})
          }
        }
      })
  }
}
