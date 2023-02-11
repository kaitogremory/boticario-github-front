import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { GithubRepo } from '../../models/github-repo';
import { GithubRepoDetailed } from '../../models/github-repo-detailed';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { BoticarioService } from 'src/app/services/boticario.service';

const ELEMENT_DATA: GithubRepo[] = [
  { language: 'Javascript', name: 'teste_repo_1', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_2', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_3', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_4', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_5', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_6', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_7', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_8', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_9', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_10', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_11', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_12', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_13', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_14', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_15', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_16', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_17', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_18', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_19', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_20', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_21', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_22', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_23', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_24', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) } ,
  { language: 'Javascript', name: 'teste_repo_25', starsCount: 1079, owner: 'owner 1', createdAt: new Date(2022,2,11) }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BoticarioService]
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['language', 'name', 'starsCount', 'owner','createdAt','actions'];
  dataSource: GithubRepo[] = [];

  constructor(public dialog: MatDialog, public boticarioService: BoticarioService) {    
    this.boticarioService.getRepositoriesList()
      .subscribe((response:GithubRepo[]) => {
      debugger
      this.dataSource = response;
    });    
  }

  ngOnInit(): void {
  }

  openDialog(element: GithubRepoDetailed): void {    
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '400px',
      data: element
    });   
  }  
}



