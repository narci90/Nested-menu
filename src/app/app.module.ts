import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NestedMenuModule } from './components';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { DetailPage } from './pages';

@NgModule({
  declarations: [AppComponent, DetailPage],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MatIconModule, NestedMenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
