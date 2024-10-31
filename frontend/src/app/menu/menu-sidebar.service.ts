import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuSidebarService {
  isSidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  isSidebarVisible$: Observable<boolean> =
    this.isSidebarVisibleSubject.asObservable();

  toggleSidebar() {
    this.isSidebarVisibleSubject.next(!this.isSidebarVisibleSubject.value);
  }
}
