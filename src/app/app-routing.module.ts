import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BottomnavComponent} from './component/bottomnav/bottomnav.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
