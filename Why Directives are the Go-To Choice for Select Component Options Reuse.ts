/*
Why Directives are the Go-To Choice for Select Component Options Reuse in Angular
https://netbasal.com/why-directives-are-the-go-to-choice-for-select-component-options-reuse-in-angular-36feffbcc7da

create a reusable directive that can be used to add options to the select component:
“select user,” “select wallet,” and “select blockchain” components.
*/
import { Directive, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[usersSelectOptions]',
  standalone: true,
})
export class UsersSelectOptionsDirective {
  private select = inject(SelectComponent);
  private users$ = inject(UserService).getUsers();

  ngOnInit() {
    this.select.placeholder = 'Select user';

    this.users$.pipe(untilDestroyed(this)).subscribe((users) => {
       this.select.options = users.map((user) => {
         return {
           id: user.id,
           label: user.name,
         };
       });
    });
  }
}

/*
We obtain a reference to the SelectComponent using DI. In the ngOnInit lifecycle hook, the select.placeholder property is set to “Select user”.

We fetch the users and sets the select options. Now, we can use it in our select component:
*/
<app-select
  usersSelectOptions <=====
  formControlName="userId"
  [allowClearSelected]="false"
></app-select>
