import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Project } from './project.model';

const BASE_URL = 'https://bb-base-server.herokuapp.com';
const model    = 'projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get(this.getUrl());
  }

  findOne(project: Project) {
    return this.httpClient.get(this.getUrlWithId(project.id));
  }

  create(project: Project) {
    return this.httpClient.post(this.getUrl(), project);
  }

  update(project: Project) {
    return this.httpClient.patch(this.getUrlWithId(project.id), project);
  }

  delete(project: Project) {
    return this.httpClient.delete(this.getUrlWithId(project.id));
  }

  private getUrl() {
    return `${BASE_URL}/${model}`;
  }

  private getUrlWithId(id: number) {
    return `${this.getUrl()}/${id}`;
  }
}
