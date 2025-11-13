import { Component, OnInit } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { Bet } from '../../models/weather.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit {
  bets$: Observable<Bet[]>;

  constructor(private bettingService: BettingService) {
    this.bets$ = this.bettingService.bets$;
  }

  ngOnInit(): void {}

  clearHistory(): void {
    if (confirm('Are you sure you want to clear all bet history?')) {
      this.bettingService.clearBets();
    }
  }
}

