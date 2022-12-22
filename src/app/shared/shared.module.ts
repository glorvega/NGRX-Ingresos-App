import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent],
  providers: [],
})
export class SharedModule {}
