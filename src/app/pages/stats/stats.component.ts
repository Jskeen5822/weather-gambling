import { Component, OnInit } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { WalletService } from '../../services/wallet.service';
import { Bet } from '../../models/weather.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  bets$: Observable<Bet[]>;
  stats = {
    totalBets: 0,
    wins: 0,
    losses: 0,
    moneyMade: 0,
    totalCurrency: 0,
    avgOdds: 0
  };

  constructor(
    private bettingService: BettingService,
    public walletService: WalletService
  ) {
    this.bets$ = this.bettingService.bets$;
  }

  ngOnInit(): void {
    this.bets$.subscribe(bets => {
      this.calculateStats(bets);
    });
  }

  calculateStats(bets: Bet[]): void {
    const resolvedBets = bets.filter(bet => bet.resolved);
    
    this.stats.totalBets = bets.length;
    this.stats.wins = resolvedBets.filter(bet => bet.won).length;
    this.stats.losses = resolvedBets.filter(bet => !bet.won).length;
    
    const totalWinnings = resolvedBets
      .filter(bet => bet.won && bet.payout)
      .reduce((sum, bet) => sum + (bet.payout || 0), 0);
    
    const totalLosses = resolvedBets
      .filter(bet => !bet.won)
      .reduce((sum, bet) => sum + bet.amount, 0);
    
    this.stats.moneyMade = totalWinnings - totalLosses;
    this.stats.totalCurrency = this.walletService.getBalance();
    
    if (bets.length > 0) {
      const totalOdds = bets.reduce((sum, bet) => sum + bet.option.odds, 0);
      this.stats.avgOdds = totalOdds / bets.length;
    }
  }

  getWinRate(): number {
    if (this.stats.totalBets === 0) return 0;
    return (this.stats.wins / (this.stats.wins + this.stats.losses)) * 100;
  }

  getWinLossRatio(): { wins: number; losses: number } {
    const total = this.stats.wins + this.stats.losses;
    if (total === 0) return { wins: 50, losses: 50 };
    
    return {
      wins: (this.stats.wins / total) * 100,
      losses: (this.stats.losses / total) * 100
    };
  }
}

