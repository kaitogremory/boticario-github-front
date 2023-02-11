import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GithubRepoDetailed } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: GithubRepoDetailed;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: GithubRepoDetailed,
    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {}

  ngOnInit(): void {    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
