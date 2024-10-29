import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "../../common/components/base-detail/base-detail.component";
import {Flight} from "../flight.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AirportService} from "../../airport/airport.service";
import {AirplaneService} from "../../airplane/airplane.service";
import {FlightForComparison} from "../flight-for-comparison.model";
import {Utilities} from "../../common/utilities";
import {Airplane} from "../../airplane/airplane.model";
import {Airport} from "../../airport/airport.model";
import {takeUntil} from "rxjs";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FlightService} from "../flight.service";
import {FieldsetModule} from "primeng/fieldset";
import {PaginatorModule} from "primeng/paginator";
import {NgClass, NgIf} from "@angular/common";
import {InputSwitchModule} from "primeng/inputswitch";
import {TooltipModule} from "primeng/tooltip";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    PaginatorModule,
    NgClass,
    InputSwitchModule,
    TooltipModule,
    NgIf,
    InputTextModule,
    CalendarModule,
    TranslateModule
  ],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent extends BaseDetailComponent<Flight, FlightForComparison> implements OnInit {
  dtoAlreadyExistsError!: boolean;
  airplaneOptions: { label: string, value: number }[] = [];
  filteredDepartureOptions: { label: string; value: number }[] = [];
  filteredArrivalOptions: { label: string; value: number }[] = [];
  airportOptions: { label: string, value: number }[] = [];
  allAirports: Airport[] = [];
  allAirplanes: Airplane[] = [];
  dateInvalid: Boolean = false;

  constructor(
    public override confirmationService: ConfirmationService,
    public override messageService: MessageService,
    public override dialogService: DialogService,
    public override dynamicDialogRef: DynamicDialogRef,
    public override dynamicDialogConfig: DynamicDialogConfig,
    public override formBuilder: FormBuilder,
    public override changeDetectorRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    protected airportService: AirportService,
    protected airplaneService: AirplaneService,
    protected flightService: FlightService
  ) {
    super(
      confirmationService,
      messageService,
      dialogService,
      dynamicDialogRef,
      dynamicDialogConfig,
      formBuilder,
      changeDetectorRef,
      translateService
    );
  }

  updateFilteredOptions() {
      const selectedDepartureId = this.formGroup.get('departureAirportId')?.value;
      const selectedArrivalId = this.formGroup.get('arrivalAirportId')?.value;

      this.filteredArrivalOptions = this.airportOptions.filter(
        airport => airport.value !== selectedDepartureId
      );

      this.filteredDepartureOptions = this.airportOptions.filter(
        airport => airport.value !== selectedArrivalId
      );
    this.changeDetectorRef.detectChanges();

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.dynamicDialogConfig.data.id], // 0 for INSERT, not 0 for UPDATE
      flightNumber: ['', [Validators.required]],
      departureAirportId: [null, [Validators.required]],
      arrivalAirportId: [null, [Validators.required]],
      airplaneId: [null, [Validators.required]],
      departureTime: [null, [Validators.required]],
      arrivalTime: [null, [Validators.required]],
      price: [null, [Validators.required]],
      bookedSeats: [0, [Validators.required]],
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.garbageCollector)).subscribe(() => {
      const departureTime = this.formGroup.get('departureTime')?.value;
      const arrivalTime = this.formGroup.get('arrivalTime')?.value;

      if (departureTime && arrivalTime && departureTime > arrivalTime) {
        this.dateInvalid = true;
      } else {
        this.dateInvalid = false;
      }
    });
    this.airplaneService.getAll().subscribe((airplanes: Airplane[]) => {
      this.airplaneOptions = airplanes.map(airplane => ({
        label: airplane.model,
        value: airplane.id
      }));
      this.allAirplanes = airplanes;
    });
    this.airportService.getAll().subscribe( {
      next: (airports: Airport[]) => {
        this.airportOptions = airports.map(airport => ({
          label: airport.code + " - " + airport.name,
          value: airport.id
        }));
        this.allAirports = airports;
        this.filteredArrivalOptions = this.airportOptions;
        this.filteredDepartureOptions = this.airportOptions;
      },
        complete: () => {
        this.formGroup.get('departureAirportId')?.valueChanges.subscribe(() => {
          this.updateFilteredOptions();
        });

        this.formGroup.get('arrivalAirportId')?.valueChanges.subscribe(() => {
          this.updateFilteredOptions();
        });
          if (this.formGroup.getRawValue().id === 0) {
            this.editMode = true;
            this.updateStatus();
            Utilities.showDynamicDialogAfterContentLoadingIsComplete(this.changeDetectorRef);
          } else {
            this.updateStatus();
            this.dto = this.dynamicDialogConfig.data.dto;

            this.dtoBackup = new FlightForComparison(
              this.dto.flightNumber,
              this.dto.departureAirport.id,
              this.dto.arrivalAirport.id,
              this.dto.airplane.id,
              this.dto.departureTime,
              this.dto.arrivalTime,
              this.dto.price
            );

            this.formGroup.patchValue({
              flightNumber: this.dto.flightNumber,
              departureAirportId: this.dto.departureAirport.id,
              arrivalAirportId: this.dto.arrivalAirport.id,
              airplaneId: this.dto.airplane.id,
              departureTime: new Date(this.dto.departureTime),
              arrivalTime: new Date(this.dto.arrivalTime),
              price: this.dto.price,
              bookedSeats: this.dto.bookedSeats
            });

            // Listen to changes
            this.formGroup.valueChanges.pipe(takeUntil(this.garbageCollector)).subscribe(() => {
              const currentDto: FlightForComparison = new FlightForComparison(
                this.formGroup.getRawValue().flightNumber,
                this.formGroup.getRawValue().departureAirportId,
                this.formGroup.getRawValue().arrivalAirportId,
                this.formGroup.getRawValue().airplaneId,
                this.formGroup.getRawValue().departureTime,
                this.formGroup.getRawValue().arrivalTime,
                this.formGroup.getRawValue().price
              );
              const hasFormBeenChanged = !Utilities.equals(this.dtoBackup, currentDto);
              this.saveButtonDisabled = !hasFormBeenChanged;
            });
            Utilities.showDynamicDialogAfterContentLoadingIsComplete(this.changeDetectorRef);
          }
      }
    });
  }

  submit() {
    const dtoToInsertOrUpdate = new Flight(
      this.formGroup.getRawValue().id, // 0 for INSERT, not 0 for UPDATE
      this.formGroup.getRawValue().flightNumber,
      this.formGroup.getRawValue().departureTime,
      this.formGroup.getRawValue().arrivalTime,
      this.formGroup.getRawValue().price,
      this.allAirports.find(airport => airport.id === this.formGroup.getRawValue().departureAirportId)!,
      this.allAirports.find(airport => airport.id === this.formGroup.getRawValue().arrivalAirportId)!,
      this.allAirplanes.find(airplane => airplane.id === this.formGroup.getRawValue().airplaneId)!,
      this.formGroup.getRawValue().bookedSeats
    );

    // INSERT or UPDATE?
    if (dtoToInsertOrUpdate.id > 0) {
      // UPDATE
      this.flightService.update(dtoToInsertOrUpdate).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('the-flight-with-id') + ' ' + dtoToInsertOrUpdate.id + ' ' + this.translateService.instant('was-updated-successfully'),
            life: 6000
          });
        },
        error: (error: any) => {
          if (error.status == 405) {
            this.dtoAlreadyExistsError = true;
            this.formGroup.get('flightNumber')!.setErrors({incorrect: true});
          }
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('the-flight-with-id') + ' ' + dtoToInsertOrUpdate.id + ' ' + this.translateService.instant('was-not-updated-successfully'),
            life: 6000
          });
        },
        complete: () => {
          this.dynamicDialogRef.close();
        }
      });
    } else {
      // INSERT
      this.flightService.insert(dtoToInsertOrUpdate).subscribe({
        next: (response: Flight) => {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant('the-flight') + ' ' + this.translateService.instant('was-created-successfully'),
            life: 6000
          });
        },
        error: (error: any) => {
          if (error.status == 405) {
            this.dtoAlreadyExistsError = true;
            this.formGroup.get('flightNumber')!.setErrors({incorrect: true});
          }
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('the-flight') + ' ' + this.translateService.instant('was-not-created'),
            life: 6000
          });
        },
        complete: () => {
          this.createMode = false;
          this.dynamicDialogRef.close();
        }
      });
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      header: this.translateService.instant('confirm'),
      icon: 'pi pi-question-circle',
      message: this.translateService.instant('delete') + '?',
      accept: () => {
        this.delete(this.dto.id);
      }
    });
  }

  delete(id: number) {
    this.flightService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translateService.instant('the-flight-with-id') + ' ' + id + ' ' + this.translateService.instant('was-deleted-successfully'),
          life: 6000
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('the-flight-with-id') + ' ' + id + ' ' + this.translateService.instant('was-not-deleted'),
          life: 6000
        });
      },
      complete: () => {
        this.dynamicDialogRef.close();
      }
    });
  }

  saveWithConfirmation() {
    this.confirmationService.confirm({
      header: this.translateService.instant('confirm'),
      icon: 'pi pi-question-circle',
      message: this.dto && this.dto.id > 0 ? this.translateService.instant('confirm-edit') : this.translateService.instant('confirm-save'),
      accept: () => {
        this.submit();
      },
      reject: () => {
      }
    });
  }
}
