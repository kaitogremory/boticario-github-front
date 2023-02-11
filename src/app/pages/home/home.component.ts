import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { GithubRepo } from '../../models/github-repo';
import { GithubRepoDetailed } from '../../models/github-repo-detailed';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { BoticarioService } from 'src/app/services/boticario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['language', 'name', 'starsCount', 'owner','createdAt','actions'];
  dataSource: GithubRepo[] = [];

  constructor(
    public dialog: MatDialog, 
    public boticarioService: BoticarioService,
    public spinner: NgxSpinnerService) {   
      this.getRepositoriesList();
  }

  ngOnInit(): void {
  }

  getRepositoriesList() {
    this.spinner.show();
    this.boticarioService.getRepositoriesList().subscribe((response:GithubRepo[]) => {      
      this.dataSource = response;      
      this.spinner.hide();      
    });    
  }

  openDialog(element: GithubRepoDetailed): void {    
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '400px',
      data: element
    });   
  }  

  updateGithubRepos(): void {
    this.spinner.show();
    this.boticarioService.getRepositoriesList().subscribe((response:GithubRepo[]) => {      
      this.dataSource = response;
      this.spinner.hide();

      Swal.fire({
        title: 'Success!',
        text: 'Repos updated in Database!',
        icon: 'success',
        confirmButtonText: 'Ok, thank you'
      })
    });    
  }
}



