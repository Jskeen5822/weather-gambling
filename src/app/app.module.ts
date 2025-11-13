import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BettingInterfaceComponent } from './components/betting-interface/betting-interface.component';
import { WalletDisplayComponent } from './components/wallet-display/wallet-display.component';
import { BetHistoryComponent } from './components/bet-history/bet-history.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BettingInterfaceComponent,
    WalletDisplayComponent,
    BetHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
