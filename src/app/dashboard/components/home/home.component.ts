import { Component } from '@angular/core';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [ProfileDetailComponent, RouterOutlet, NavbarComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
