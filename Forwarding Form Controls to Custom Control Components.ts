/*
Forwarding Form Controls to Custom Control Components in Angular

https://netbasal.com/forwarding-form-controls-to-custom-control-components-in-angular-701e8406cc55

Sometimes we want to forward and use an existing form control rather than creating a redundant value accessor wrapper. 
One common use case is when creating, for example, custom input components.
We want to use form controls passed via formControl, formControlName, and ngModel directives in our custom input component and forward it to our internal input element.


Using Host Directives

NoopValueAccessorDirective:
*/
@Directive({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NoopValueAccessorDirective,
    },
  ],
})
export class NoopValueAccessorDirective implements ControlValueAccessor {
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}

//The next step is to create the same injectNgControl function as before without setting the value accessor property:

export function injectNgControl() {
  const ngControl = inject(NgControl, { self: true, optional: true });

  if (!ngControl) throw new Error('...');

  if (
    ngControl instanceof FormControlDirective ||
    ngControl instanceof FormControlName ||
    ngControl instanceof NgModel
  ) {
    return ngControl;
  }

  throw new Error('...');
}

//Finally, we’ll use it in our input component:

@Component({
  selector: 'app-input',
  standalone: true,
  // 👇👇👇
  hostDirectives: [NoopValueAccessorDirective],
  imports: [ReactiveFormsModule],
  template: ` <input [formControl]="ngControl.control" /> `,
})
export class InputComponent {
  ngControl = injectNgControl();
}

//Now, we can use our input component with any control we want:

<app-input [formControl]="control" />

<form [formGroup]="form">
    <app-input formControlName="name"></app-input>

    <ng-container formArrayName="skills">
       <app-input [formControlName]="index" 
            *ngFor="let c of skills.controls; index as index"></app-input>
    </ng-container>
</form>