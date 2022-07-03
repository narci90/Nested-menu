import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NestedMenuComponent } from './nested-menu.component';
import { NestedMenuItemComponent } from './components';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NestedMenuComponent, NestedMenuItemComponent],
  imports: [CommonModule, RouterModule, MatMenuModule],
  exports: [NestedMenuComponent]
})
export class NestedMenuModule {}
