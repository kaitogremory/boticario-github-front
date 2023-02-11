import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GithubRepo } from '../models/github-repo';
import { GithubRepoDetailed } from '../models/github-repo-detailed';
import { Observable } from 'rxjs';


@Injectable()
export class BoticarioService {
    
    constructor(public client: HttpClient) {
        this.apiURL = `${environment.url_api_boticario}`;
    }

    readonly apiURL : string;

    getRepositoriesList(): Observable<GithubRepo[]>{
        return this.client.get<GithubRepo[]>(`${this.apiURL}/getRepositoriesList`);
    }

    updateListReposFromGithubAPI(): Observable<boolean[]>{
        return this.client.get<boolean[]>(`${this.apiURL}/updateListReposFromGithubAPI`);
    }
    
    getRepoDetailByName(id: any): Observable<GithubRepoDetailed>{
        return this.client.get<GithubRepoDetailed>(`${this.apiURL}/getRepoDetailByName/${id}`);
    }
}
