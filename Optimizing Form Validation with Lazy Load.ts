/*
Optimizing Angular Form Validation with Lazy Load
https://netbasal.com/optimizing-angular-form-validation-with-lazy-load-61265536a6f2
*/
//created an async validator that loads the library only when I need it:

function addressValidator(): AsyncValidatorFn {
  return function (control) {
    return import('address-validator-package-name').then((m) => {
      return m.validate(control.value) ? null : { invalidAddress: true };
    });
  };
}

//The import function allows us to lazy load the library and use its validate() method. Then add it to the form control:

@Component({ ... })
export class FormComponent {
  addressControl = new FormControl('', {
    asyncValidators: addressValidator(),
  });
}

/*
The current addressValidator implementation will work when we’re not using the onPush change detection strategy in the component. Whenever we do, we’ll need to alter the code and call markForCheck:
*/
export const ADDRESS_VALIDATOR = new InjectionToken<AsyncValidatorFn>(
  'ADDRESS_VALIDATOR'
);

const addressValidator = {
  provide: ADDRESS_VALIDATOR,
  useFactory(): AsyncValidatorFn {
    const cdr = inject(ChangeDetectorRef);

    return (control) => {
      return import('address-validator-package-name').then((m) => {
        cdr.markForCheck();
        return m.validate(control.value) ? null : { invalidAddress: true };
      });
    };
  },
};
@Component({
  providers: [addressValidator]
})
export class FormComponent {
  addressControl = new FormControl('', {
    asyncValidators: inject(ADDRESS_VALIDATOR),
  });
}