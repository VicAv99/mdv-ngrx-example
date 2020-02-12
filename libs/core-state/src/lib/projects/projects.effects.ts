import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as projectsActions from './projects.actions';
import { Project, ProjectsService } from '@workspace/core-data';
import { ProjectsPartialState } from './projects.reducer';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProjects, {
      run: (
        action: ReturnType<typeof projectsActions.loadProjects>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.all().pipe(
          map((projects: Project[]) => projectsActions.projectsLoaded({ projects }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.loadProjects>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  loadProject$ = createEffect(() =>
    this.dataPersistence.fetch(projectsActions.loadProject, {
      run: (
        action: ReturnType<typeof projectsActions.loadProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.findOne(action.projectId).pipe(
          map((project: Project) => projectsActions.projectLoaded({ project }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.loadProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  selectProjectOnLoad$ = createEffect(() =>
    this.dataPersistence.actions.pipe(
      ofType(projectsActions.projectLoaded),
      map(({ project }) => projectsActions.projectSelected({ selectedProjectId: project.id }))
    )
  );

  addProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.createProject, {
      run: (
        action: ReturnType<typeof projectsActions.createProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.create(action.project).pipe(
          map((project: Project) => projectsActions.projectCreated({ project }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.createProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.updateProject, {
      run: (
        action: ReturnType<typeof projectsActions.updateProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.update(action.project).pipe(
          map((project: Project) => projectsActions.projectUpdated({ project }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.updateProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteProject$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(projectsActions.deleteProject, {
      run: (
        action: ReturnType<typeof projectsActions.deleteProject>,
        state: ProjectsPartialState
      ) => {
        return this.projectsService.delete(action.project).pipe(
          map(() => projectsActions.projectDeleted({ project: action.project }))
        );
      },
      onError: (action: ReturnType<typeof projectsActions.deleteProject>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsPartialState>,
    private projectsService: ProjectsService
  ) {}
}
