import { Injectable  } from "@angular/core";
import { FormControl, FormGroup, Validator } from '@angular/forms'

// to get instance of it and use dependcy injection to get instance
// of function,so instance of class and use propreties etc
@Injectable  ({providedIn:'root'})

export class MatchPassword implements Validator {
    // or form control or if u dont know type is abstract control
    validate(formGroup: FormGroup) {
        const {password,passwordConfirmation}= formGroup.value;

        if (password===passwordConfirmation){
            return null;
        }
        else {
            return { passwordsDontMatch: true };
        }
    }
}