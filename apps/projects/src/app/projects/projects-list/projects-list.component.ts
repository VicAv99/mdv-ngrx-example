import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '@workspace/core-data';

@Component({
  selector: 'workspace-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  @Input() projects: Project[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(private router: Router) {}

  viewProjectDetails(project: Project) {
    this.router.navigate(['project', project.id]);
  }
}
