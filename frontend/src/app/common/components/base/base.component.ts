import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export abstract class BaseComponent implements OnDestroy {
  garbageCollector: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.garbageCollector.next();
    this.garbageCollector.complete(); // Please release me!
  }
}
