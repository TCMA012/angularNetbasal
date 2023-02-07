/*
Implementing Upsert Form Dialogs in Angular
https://netbasal.com/implementing-upsert-form-dialogs-in-angular-732197d4936b

Many applications requires the ability to create and update records through the user interface. Usually, we’ll want to utilize the same dialog component for both operations. The term 
“upsert”
 is a combination of the words 
“update”
 and 
 “insert,”
  and it refers to the fact that the dialog can be used to either create a new record or update an existing one.

I’ll use the 
ngneat/dialog
 library, but you can use whatever you prefer. First, we’ll create a shared interface for the data we need to pass to our dialog:
*/
export interface UpsertDialogData<T> {
  action: 'add' | 'edit';
  actions$: Record<
    UpsertDialogData['type'],
    (value: T) => Observable<any>
  >;
  currentValue: T | undefined;
}

/*
We pass the operation action type and the actions we want to execute. In addition, we pass the current value for the edit case. We could make it more strict by narrowing the action only to allow the currentValue property when we’re in edit mode, but I’ll keep it simple.

Now let’s create the base upsert dialog component:
*/
import { DialogRef } from '@ngneat/dialog';
import { loadingFor } from '@ngneat/loadoff';
import { HotToastService } from '@ngneat/hot-toast';

@Directive()
export abstract class UpsertDialogComponent<Entity extends Record<string, any>>
  implements OnInit
{
  private toast = inject(HotToastService);
  loader = loadingFor('upsert');
  ref: DialogRef<UpsertDialogData<Entity>> = inject(DialogRef);

  abstract get form(): FormGroup;

  abstract getMessages(): Record<UpsertDialogData['action'], string>;

  get action() {
    return this.ref.data.action;
  }

  ngOnInit() {
    if (this.ref.data.action === 'edit') {
      this.form.patchValue(this.ref.data.currentValue);
    }
  }

  upsert() {
    if (this.form.invalid) return;

    this.ref.data.actions$[this.action](this.form.getRawValue())
      .pipe(this.loader.upsert.track())
      .subscribe(() => {
        this.ref.close();
        this.toast.success(this.getMessages()[this.action]);
      });
  }
}

/*
Each component that extends this class must implement a 
form property and 
getMessages() method. Once the form is created, we update the initial value with the value we receive from the dialog data when the form is in edit mode. The form value is passed to the relevant action upon submission.

Let’s use our base class and create a dialog for upserting a user:
*/
import { errorTailorImports } from '@ngneat/error-tailor';

@Component({
  standalone: true,
  imports: [errorTailorImports],
  templateUrl: `./upsert-user-dialog.component.html`
})
export class UpsertUserDialogComponent extends UpsertDialogComponent<User> {

  form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
  });

  getMessages() {
    return {
      add: `User was added successfully`,
      edit: `User was updated successfully`,
    };
  }
}



<header>
  <h3>{{ action === 'edit' ? 'Edit User' : 'New User' }}</h3>
</header>

<div>
  <form [formGroup]="form" errorTailor>
     <input
        placeholder="Name"
        formControlName="name" />
  </form>
</div>

<footer>
  <button dialogClose>Cancel</button>
  <button
    [loading]="loader.upsert.inProgress$ | async"
    (click)="upsert()"
  >
    {{ action === 'edit' ? 'Save' : 'Create' }}
  </button>
</footer>



//All that remains is for us to open our dialog and pass the relevant information:

@Component({
  template: `
    <button (click)="openUpsertUserDialog('add')">Add User</button>

     <-- ngFor -->
    <button (click)="openUpsertUserDialog('edit', user)">Edit</button>
  `
})
export class UsersPageComponent {

  openUpsertUserDialog(
    action: UpsertDialogData['action'],
    currentValue?: UpsertDialogData<User>['currentValue']
  ) {
    this.dialogService.open(UpsertUserDialogComponent, {
      data: {
        action,
        currentValue,
        actions$: {
          add: (user) => this.usersService.addUser({ user}),
          edit: (user) => this.usersService.updateUser({ user }),
        },
      },
    });
  }

}
