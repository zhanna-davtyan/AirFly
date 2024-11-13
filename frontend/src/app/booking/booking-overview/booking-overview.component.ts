import {Component, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {Booking} from "../booking.model";
import {Router} from "@angular/router";
import {BookingDetailsComponent} from "../booking-details/booking-details.component";
import {BaseOverviewComponent} from "../../common/components/base-overview/base-overview.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-booking-overview',
  standalone: true,
  imports: [
    ToolbarModule,
    TranslateModule,
    CardModule,
    DatePipe,
    DividerModule,
    NgIf,
    NgClass
  ],
  providers: [DynamicDialogRef],
  templateUrl: './booking-overview.component.html',
  styleUrl: './booking-overview.component.css'
})
export class BookingOverviewComponent extends BaseOverviewComponent<Booking> implements OnInit {
  bookings!: Booking[];

  constructor(
    public override confirmationService: ConfirmationService,
    public override messageService: MessageService,
    public override dialogService: DialogService,
    public override dynamicDialogRef: DynamicDialogRef,
    protected bookingService: BookingService,
    protected translateService: TranslateService,
    protected router: Router
  ) {
    super(confirmationService, messageService, dialogService, dynamicDialogRef);
  }

  ngOnInit(): void {
    this.bookingService.getAllByUser().subscribe({
      next: (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      error: () => {
        this.router.navigate(['/error']);
      }
    })
  }

  openDynamicDialogDetails(booking: Booking) {
    if (this.showDialogDetails) {
      this.dynamicDialogRef = this.dialogService.open(BookingDetailsComponent, {
        data: {
          bookingId: booking.id
        },
        width: '800px',
        header: this.translateService.instant('booking-with-id') + ' #AF' + booking.id
      });
    }
  }

  getTimeDifference(departureTime: any, arrivalTime: any): string {
    const depTime = departureTime instanceof Date ? departureTime : new Date(departureTime);
    const arrTime = arrivalTime instanceof Date ? arrivalTime : new Date(arrivalTime);

    if (isNaN(depTime.getTime()) || isNaN(arrTime.getTime())) {
      return 'Invalid Date';
    }

    const diffMs = Math.abs(depTime.getTime() - arrTime.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

}
