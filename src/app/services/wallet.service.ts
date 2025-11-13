import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private readonly INITIAL_BALANCE = 200;
  private balanceSubject = new BehaviorSubject<number>(this.INITIAL_BALANCE);
  public balance$: Observable<number> = this.balanceSubject.asObservable();

  constructor() {
    const savedBalance = localStorage.getItem('walletBalance');
    if (savedBalance) {
      this.balanceSubject.next(parseFloat(savedBalance));
    }
  }

  getBalance(): number {
    return this.balanceSubject.value;
  }

  deduct(amount: number): boolean {
    const currentBalance = this.balanceSubject.value;
    if (currentBalance >= amount) {
      const newBalance = currentBalance - amount;
      this.balanceSubject.next(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
      return true;
    }
    return false;
  }

  add(amount: number): void {
    const newBalance = this.balanceSubject.value + amount;
    this.balanceSubject.next(newBalance);
    localStorage.setItem('walletBalance', newBalance.toString());
  }

  reset(): void {
    this.balanceSubject.next(this.INITIAL_BALANCE);
    localStorage.setItem('walletBalance', this.INITIAL_BALANCE.toString());
  }
}

