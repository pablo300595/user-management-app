import { Component, inject, ViewChild } from '@angular/core';
import { InsightCardsComponent } from '../insight-cards/insight-cards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { User, UserTableRow } from '../../../models';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard-view',
  imports: [
    InsightCardsComponent,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [provideNativeDateAdapter()],
  standalone: true,
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss',
})
export class DashboardViewComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _userService = inject(UserService);
  displayedColumns: string[] = ['number', 'name', 'email', 'address', 'phone', 'birth', 'actions'];
  currentPage = 1;

  dataSource = new MatTableDataSource<UserTableRow>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterFormGroup = this._formBuilder.group({
    searchBar: [''],
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // loadUsers(): void {
  //   this._userService.getUsers(this.currentPage, 20).subscribe((users) => {
  //     const userTableRows: UserTableRow[] = users.map((user, index) => ({
  //       number: index + 1 + (this.currentPage - 1) * 10,
  //       name: `${user.name.first} ${user.name.last}`,
  //       email: user.email,
  //       address: `${user.location.city}, ${user.location.country}`,
  //       phone: user.phone,
  //       birth: new Date(user.dob.date).toLocaleDateString(),
  //       actions: 'delete',
  //     }));

  //     this.dataSource.data = userTableRows;
  //   });
  // }

  loadUsers(): void {
    const cachedUsers = localStorage.getItem('cachedUsers');

    if (cachedUsers) {
      const parsedUsers: User[] = JSON.parse(cachedUsers);
      this.populateTable(parsedUsers);
    } else {
      this._userService.getUsers(this.currentPage, 20).subscribe((users) => {
        localStorage.setItem('cachedUsers', JSON.stringify(users));
        this.populateTable(users);
      });
    }
  }

  private populateTable(users: User[]): void {
    const userTableRows: UserTableRow[] = users.map((user, index) => ({
      number: index + 1 + (this.currentPage - 1) * 10,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      address: `${user.location.city}, ${user.location.country}`,
      phone: user.phone,
      birth: new Date(user.dob.date).toLocaleDateString(),
      actions: 'delete',
    }));

    this.dataSource.data = userTableRows;
  }

  search(searchCriteria: string) {
    this.dataSource.filter = searchCriteria.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
