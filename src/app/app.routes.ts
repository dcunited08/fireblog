import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { PostView } from './components/post-view/post-view';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Features } from './components/features/features';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'blogpost/:id', component: PostView },
  { path: 'admin', component: AdminDashboard, canActivate: [adminGuard] },
  { path: 'features', component: Features }
];
