import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GithubRepoDetailed } from '../../models/github-repo-detailed';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: GithubRepoDetailed;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: GithubRepoDetailed,
    public dialogRef: MatDialogRef<ElementDialogComponent>
  ) {
    
  }

  ngOnInit(): void {    
    if (this.data.name != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
