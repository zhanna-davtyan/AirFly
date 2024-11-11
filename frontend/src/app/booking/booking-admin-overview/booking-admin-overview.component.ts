import {Component, OnInit} from '@angular/core';
import {BaseOverviewComponent} from "../../common/components/base-overview/base-overview.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {takeUntil} from "rxjs";
import {Booking} from "../booking.model";
import {BookingService} from "../booking.service";
import {BookingDetailsComponent} from "../booking-details/booking-details.component";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonDirective} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'app-booking-admin-overview',
  standalone: true,
  imports: [
    ToolbarModule,
    TranslateModule,
    FormsModule,
    InputTextModule,
    ButtonDirective,
    TooltipModule,
    TableModule,
    MultiSelectModule,
    NgForOf,
    NgSwitchCase,
    NgSwitch
  ],
  providers: [{provide: DynamicDialogRef}],
  templateUrl: './booking-admin-overview.component.html',
  styleUrl: './booking-admin-overview.component.css'
})
export class BookingAdminOverviewComponent extends BaseOverviewComponent<Booking> implements OnInit{
  priceOptions: any[] = [];
  emailOptions: any[] = [];

  constructor(
    public override confirmationService: ConfirmationService,
    public override messageService: MessageService,
    public override dialogService: DialogService,
    public override dynamicDialogRef: DynamicDialogRef,
    protected bookingService: BookingService,
    protected translateService: TranslateService
  ) {
    super(confirmationService, messageService, dialogService, dynamicDialogRef);
  }

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(takeUntil(this.garbageCollector))
      .subscribe(() => {
        this.refreshFilters(this.dtos);
        this.updateColumns();
      });
    this.refreshData();
    this.updateColumns();
    if (this.table) this.table.clear(); // Reset existing filtering
  }

  refreshData() {
    this.bookingService.getAll().subscribe({
      next: (response: Booking[]) => {
        this.dtos = response;
        this.refreshFilters(this.dtos)
      }
    })
  }

  refreshFilters(dtos: Booking[]) {
    this.priceOptions = [];
    for (const totalPrice of [...new Set(dtos.map(dto => dto.totalPrice))].sort()) {
      this.priceOptions.push({label: totalPrice, value: totalPrice});
    }

    this.emailOptions = [];
    for (const email of [...new Set(dtos.map(dto => dto.user.email))].sort()) {
      this.emailOptions.push({label: email , value: email});
    }
  }

  updateColumns() {
    this.columns = [
      {header: 'Id', field: 'id'},
      {header: 'E-Mail', field: 'user.email'},
      {header: 'Preis', field: 'totalPrice'},
    ];
  }

  openDynamicDialogDetails(row?: any) {
    if (this.showDialogDetails) {
      this.dynamicDialogRef = this.dialogService.open(BookingDetailsComponent, {
        data: {
          bookingId: row.id
        },
        width: '800px',
        header: this.translateService.instant('booking-with-id') + ' #AF' + row.id
      });
      this.dynamicDialogRef.onClose.subscribe(() => {
        this.refreshData();
      });
    }
  }
}

