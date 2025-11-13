import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { HomeComponent } from './pages/home/home.component';
import { BettingComponent } from './pages/betting/betting.component';
import { StatsComponent } from './pages/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    HomeComponent,
    BettingComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
