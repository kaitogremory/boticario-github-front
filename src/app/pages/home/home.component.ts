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
    this.boticarioService.getRepositoriesList().subscribe(
      (response:GithubRepo[]) => {      
        if(response != null) {
          this.dataSource = response;      
        }
        this.spinner.hide();    
    }, err => {            
      this.spinner.hide();
      Swal.fire('Error!', err.message,'error');
    });      
  }

  openDialog(element: GithubRepo): void {
    this.spinner.show();
    this.boticarioService.getRepoDetailByName(element.name).subscribe(
      (response:GithubRepoDetailed) => {        
        response.createdAtViewDate = this.createFormattedTextDate(response.createdAt);
        response.updatedAtViewDate = this.createFormattedTextDate(response.updatedAt);
      const dialogRef = this.dialog.open(ElementDialogComponent, {
        width: '700px',
        data: response,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      }); 
      this.spinner.hide();      
    }, err => {
      this.spinner.hide();
      Swal.fire('Error!', err.message,'error');
    });         
  }  

  updateGithubRepos(): void {
    this.spinner.show();
    this.boticarioService.updateListReposFromGithubAPI().subscribe(() => {      
      this.spinner.hide();
      Swal.fire({
        title: 'Success!',
        text: 'Repos updated in Database!',
        icon: 'success',
        confirmButtonText: 'Ok, thank you!'
      }).then(async (result) => {
        this.getRepositoriesList();
      });
    }, err => {
      this.spinner.hide();
      Swal.fire('Error!', err.message,'error');
    });
  }

  clearRepositoriesFromBase(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "this cannot be reversed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        
        this.boticarioService.clearRepositoriesFromBase().subscribe(() => {      
          this.spinner.hide();
          this.dataSource = [];
          Swal.fire({
            title: 'Success!',
            text: 'Successfully cleaned repositories!',
            icon: 'success',
            confirmButtonText: 'Ok, thank you!'
          }).then(async (result) => {
            
          });
        }, err => {
          this.spinner.hide();
          Swal.fire('Error!', err.message,'error');
        });
      }
    });
  }

  createFormattedTextDate(date: Date): string {    
    let dateString = date.toString();

    let year = dateString.substring(0,4);
    let month = dateString.substring(5,7);
    let day = dateString.substring(8,10);
    
    let result = "" + day + "/" + month + "/" + year;
    return result;
  }
}



