import { Component } from '@angular/core';

@Component({
  selector: 'workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projects';
  links = [
    {path: '/projects', label: 'PROJECTS', icon: 'loyalty'},
    {path: '/login', label: 'LOGIN', icon: 'person'},
  ];
}
