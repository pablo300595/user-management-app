import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { InsightCardsComponent } from './insight-cards/insight-cards.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, ProfileDetailComponent, InsightCardsComponent, UsersTableComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
