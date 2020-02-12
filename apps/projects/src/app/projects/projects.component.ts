import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Project } from '@workspace/core-data';
import { ProjectsFacade } from '@workspace/core-state';

@Component({
  selector: 'workspace-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  form: FormGroup;
  project: Project;
  projects$: Observable<Project[]> = this.projectsFacade.allProjects$;

  constructor(
    private formBuilder: FormBuilder,
    private projectsFacade: ProjectsFacade
  ) { }

  ngOnInit() {
    this.projectsFacade.loadProjects();
    this.projectsFacade.mutations$.subscribe(() => this.reset());
    this.initForm();
  }

  select(project: Project) {
    this.project = project;
    this.form.patchValue(project);
  }

  save(project: Project) {
    if (project.id) {
      this.projectsFacade.updateProject(project);
      return;
    }
    this.projectsFacade.createProject(project);
  }

  delete(project: Project) {
    this.projectsFacade.deleteProject(project);
  }

  reset() {
    this.form.reset();
    this.project = {} as Project;
    // Marks errors null for each form control.
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key).setErrors(null);
    });
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      title: ['', Validators.compose([Validators.required])],
      details: [''],
      importanceLevel: [0, Validators.compose([Validators.required])]
    });
  }
}
