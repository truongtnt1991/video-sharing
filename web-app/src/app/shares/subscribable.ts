import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export abstract class Subscribable implements OnDestroy {
  private subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onDestroy();
  }

  subscribe<T>(
    observable: Observable<T>,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): void {
    this.subscription.add(observable.subscribe(next, error, complete));
  }

  protected onDestroy(): void {}
}
