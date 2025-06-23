import { Component, inject } from '@angular/core';
import { User } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { DatePipe } from '@angular/common';
import { PhoneNumberPipe } from '../../../../shared/pipes/phone.pipe';

@Component({
  selector: 'app-profile-view',
  imports: [DatePipe, PhoneNumberPipe],
  standalone: true,
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss',
})
export class ProfileViewComponent {
  private _route = inject(ActivatedRoute);
  private _userService = inject(UserService);
  user: User | null = null;

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.user = this._userService.getUserByIndex(id);
    }
  }
}
