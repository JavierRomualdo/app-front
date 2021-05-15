import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLayoutComponent } from './custom-layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CustomLayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CustomLayoutModule { }
