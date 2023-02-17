/*
Making DRY Conditional Structural Directives Using Angular Directive Composition API
https://netbasal.com/making-dry-conditional-structural-directives-using-angular-directive-composition-api-bc346672445d

In Angular v15, we can use the new directive composition API to apply directives directly to the host element of a component. Creating custom conditional structural directives at the moment involves a bit of boilerplate work. Let’s see how we can leverage it to create cleaner custom ngIf directives.

Assume that we need to toggle some views based on the project status of the user. We will create a reusable directive named 
ShowIfProjectActiveDirective:
*/
import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[showIfProjectActive]',
  hostDirectives: [{ 
     directive: NgIf, 
     inputs: ['ngIfElse: showIfProjectActiveElse'] },
  ],
  standalone: true,
})
export class ShowIfProjectActiveDirective {
  @Input('showIfProjectActive') showIfProjectActive: boolean;

  private ngIfDirective = inject(NgIf);
  private projectService = inject(ProjectService);

  ngOnInit() {
    this.projectService.active$
      .pipe(untilDestroyed(this))
      .subscribe((isActive) => {
        this.ngIfDirective.ngIf = this.showIfProjectActive
          ? isActive
          : !isActive;
      });
  }
}

/*
The hostDirectives feature is used to create an instance of the NgIf directive and apply it to our host element. To set the ngIf property, we obtain a reference to the NgIf directive instance and set it manually based on our active logic.

Additionally, we want consumers to be able to use the built-in ngIfElse input, so we expose the input from the NgIfDirective under the showIfProjectActiveElse alias.

Now, we can use our directive in the template:
*/
<button *showIfProjectActive="true; else elseTpl">Foo</button>

<ng-template #elseTpl>Bar</ng-template>

<!-- Or use the ng-template version -->
<ng-template [showIfProjectActive]="true" 
             [showIfProjectActiveElse]="elseTpl">
  Foo
</ng-template>

//Here’s another role-based view example:

import { NgIf } from '@angular/common';
import { Directive, inject, Input } from '@angular/core';

@Directive({
  selector: '[ifHasRole]',
  hostDirectives: [{ 
     directive: NgIf, 
     inputs: ['ngIfElse: ifHasRoleElse'] 
  }],
  standalone: true,
})
export class IfHasRoleDirective {
  private ngIfDirective = inject(NgIf);
  private authorizationService = inject(AuthorizationService);

  @Input('ifHasRole') set role(role: 'admin' | 'user') {
    this.ngIfDirective.ngIf = this.authorizationService.hasRole(role)
  }
}

//And use it in the template:

<button *ifHasRole="'admin'; else elseTpl">Foo</button>

<ng-template #elseTpl>Bar</ng-template>