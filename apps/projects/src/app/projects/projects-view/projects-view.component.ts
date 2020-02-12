import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';

import { Project } from '@workspace/core-data';
import { ProjectsFacade } from '@workspace/core-state';

@Component({
  selector: 'workspace-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.scss']
})
export class ProjectsViewComponent implements OnInit {
  project$: Observable<Project> = this.projectsFacade.selectedProject$;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectsFacade: ProjectsFacade
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => this.projectsFacade.loadProject(res.id));
  }

  back() {
    this.location.back();
  }

}
