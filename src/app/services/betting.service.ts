import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bet } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class BettingService {
  private betsSubject = new BehaviorSubject<Bet[]>([]);
  public bets$: Observable<Bet[]> = this.betsSubject.asObservable();

  constructor() {
    const savedBets = localStorage.getItem('bets');
    if (savedBets) {
      try {
        const bets = JSON.parse(savedBets).map((bet: any) => ({
          ...bet,
          timestamp: new Date(bet.timestamp)
        }));
        this.betsSubject.next(bets);
      } catch (e) {
        console.error('Error loading bets from localStorage', e);
      }
    }
  }

  placeBet(bet: Bet): void {
    const currentBets = this.betsSubject.value;
    const newBets = [...currentBets, bet];
    this.betsSubject.next(newBets);
    localStorage.setItem('bets', JSON.stringify(newBets));
  }

  resolveBet(betId: string, won: boolean, payout: number): void {
    const currentBets = this.betsSubject.value;
    const updatedBets = currentBets.map(bet => 
      bet.id === betId 
        ? { ...bet, resolved: true, won, payout }
        : bet
    );
    this.betsSubject.next(updatedBets);
    localStorage.setItem('bets', JSON.stringify(updatedBets));
  }

  getBets(): Bet[] {
    return this.betsSubject.value;
  }

  getActiveBets(): Bet[] {
    return this.betsSubject.value.filter(bet => !bet.resolved);
  }

  clearBets(): void {
    this.betsSubject.next([]);
    localStorage.removeItem('bets');
  }
}

