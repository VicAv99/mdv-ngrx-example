import { createAction, props } from '@ngrx/store';

import { Project } from '@workspace/core-data';

export const projectSelected = createAction(
  '[PROJECT] Project Selected',
  props<{ selectedProjectId: string | number }>()
);

// Load Actions
export const loadProjects = createAction('[PROJECT] Load Projects');

export const loadProject = createAction(
  '[PROJECT] Load Project',
  props<{ project: Project }>()
);

export const projectsLoaded = createAction(
  '[PROJECT] Projects Loaded',
  props<{ projects: Project[] }>()
);

export const projectLoaded = createAction(
  '[PROJECT] Project Loaded',
  props<{ project: Project }>()
);

// Create Actions
export const createProject = createAction(
  '[PROJECT] Create Project',
  props<{ project: Project }>()
);

export const projectCreated = createAction(
  '[PROJECT] Project Created',
  props<{ project: Project }>()
);

// Update Actions
export const updateProject = createAction(
  '[PROJECT] Update Project',
  props<{ project: Project }>()
);

export const projectUpdated = createAction(
  '[PROJECT] Project Updated',
  props<{ project: Project }>()
);

// Delete Actions
export const deleteProject = createAction(
  '[PROJECT] Delete Project',
  props<{ project: Project }>()
);

export const projectDeleted = createAction(
  '[PROJECT] Project Deleted',
  props<{ project: Project }>()
);
