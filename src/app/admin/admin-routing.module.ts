import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonAdminComponent } from './common-admin/common-admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthSGuard } from './guards/auth-s.guard';
import { HomeComponent } from './home/home.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { MenuComponent } from './menu/menu.component';
import { PostsComponent } from './posts/posts.component';
import { AddpostsComponent } from './posts/addposts/addposts.component';
import { EditpostsComponent } from './posts/editposts/editposts.component';
import { SliderComponent } from './slider/slider.component';

const routes: Routes = [
  {path : "" , component : CommonAdminComponent , children : [
      {path : '' , component : HomeComponent , canActivate : [AuthGuard]},
      {path : 'danhmuc' , component : DanhmucComponent , canActivate : [AuthGuard]},
      {path : 'slider' , component : SliderComponent , canActivate : [AuthGuard]},
      {path : 'menu' , component : MenuComponent , canActivate : [AuthGuard]},
      {path : 'baiviet' , component : PostsComponent , canActivate : [AuthGuard]},
      {path : 'baiviet/add' , component : AddpostsComponent , canActivate : [AuthGuard]},
      {path : 'baiviet/edit' , component : EditpostsComponent , canActivate : [AuthGuard]},
      {path : 'login' , component : LoginComponent , canActivate : [AuthSGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
