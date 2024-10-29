import {Component, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {FlightService} from "../flight.service";
import {Flight} from "../flight.model";
import {FlightDetailsComponent} from "../flight-details/flight-details.component";
import {BaseOverviewComponent} from "../../common/components/base-overview/base-overview.component";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {CommonModule, NgSwitch} from "@angular/common";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-flight-overview',
  standalone: true,
  imports: [
    FormsModule,
    TableModule,
    MultiSelectModule,
    NgSwitch,
    ToolbarModule,
    CommonModule,
    ButtonDirective,
    InputTextModule,
    TooltipModule
  ],
  providers: [
    DynamicDialogRef
  ],
  templateUrl: './flight-overview.component.html',
  styleUrl: './flight-overview.component.css'
})
export class FlightOverviewComponent extends BaseOverviewComponent<Flight> implements OnInit{
  flightNumberOptions: any[] = [];
  departureAirportOptions: any[] = [];
  arrivalAirportOptions: any[] = [];

  constructor(
    public override confirmationService: ConfirmationService,
    public override messageService: MessageService,
    public override dialogService: DialogService,
    public override dynamicDialogRef: DynamicDialogRef,
    protected flightService: FlightService,
  ) {
    super(confirmationService, messageService, dialogService, dynamicDialogRef);
  }

  ngOnInit(): void {
    this.refreshData();
    this.updateColumns();
    if (this.table) this.table.clear(); // Reset existing filtering
  }

  refreshData() {
    this.flightService.getAll().subscribe({
      next: (response: Flight[]) => {
        this.dtos = response;
        this.refreshFilters(this.dtos)
      }
    })
  }

  refreshFilters(dtos: Flight[]) {
    this.flightNumberOptions = [];
    for (const flightNumber of [...new Set(dtos.map(dto => dto.flightNumber))].sort()) {
      this.flightNumberOptions.push({label: flightNumber, value: flightNumber});
    }

    this.departureAirportOptions = [];
    for (const departureAirport of [...new Set(dtos.map(dto => dto.departureAirport))].sort()) {
      this.departureAirportOptions.push({label: departureAirport.code , value: departureAirport.code});
    }

    this.arrivalAirportOptions = [];
    for (const arrivalAirport of [...new Set(dtos.map(dto => dto.arrivalAirport))].sort()) {
      this.arrivalAirportOptions.push({label: arrivalAirport.code, value: arrivalAirport.code});
    }
  }

  updateColumns() {
      this.columns = [
        {header: 'Flugnummer', field: 'flightNumber'},
        {header: 'Abflughafen', field: 'departureAirport.code'},
        {header: 'Zielflughafen', field: 'arrivalAirport.code'},
      ];
  }

  openDynamicDialogDetails(create: boolean, row?: any) {
    if (this.showDialogDetails) {
      this.dynamicDialogRef = this.dialogService.open(FlightDetailsComponent, {
        data: {
          id: create ? 0 : row!.id,
          dto: row
        },
        width: '800px',
        styleClass: 'my-invisible'
      });
      this.dynamicDialogRef.onClose.subscribe(() => {
        this.refreshData();
      });
    }
  }
}
