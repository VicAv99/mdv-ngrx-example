import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@workspace/ui-login';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsViewComponent } from './projects/projects-view/projects-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {
    path: '', children: [
      {path: '', redirectTo: '/projects', pathMatch: 'full'},
      {path: 'projects', component: ProjectsComponent},
      {path: 'project/:id', component: ProjectsViewComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/projects'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
