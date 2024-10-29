import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BaseComponent} from '../base/base.component';
import {Utilities} from '../../utilities';
import {TranslateService} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.css'],
  providers: [MessageService]
})
export abstract class BaseDetailComponent<DTO, DTO_FOR_COMPARISON> extends BaseComponent {
  dto!: DTO;
  dtoBackup!: DTO_FOR_COMPARISON;

  formGroup!: FormGroup;

  editMode = false;
  createMode: boolean = false;

  editModeButtonVisible = false;
  actionButtonsVisible = false;
  saveButtonDisabled = false;

  protected constructor(
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef,
    public dynamicDialogConfig: DynamicDialogConfig,
    public formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
    protected translateService: TranslateService
  ) {
    super();
  }

  closeDialogWithoutSaving(destroyPendingDialogs: boolean) {
    this.confirmationService.confirm({
      header: this.translateService.instant('confirm'),
      icon: 'pi pi-question-circle',
      message: this.translateService.instant('confirm-cancel'),
      accept: () => {
        if (destroyPendingDialogs) {
          Utilities.destroyPendingDialogs(this.dialogService);
        } else {
          this.dynamicDialogRef.close();
        }
      },
      reject: () => {}
    });
  }

  updateStatus() {
    if (this.formGroup?.getRawValue().id === 0) {
      // CREATE
      this.editModeButtonVisible = false;
      this.actionButtonsVisible = true;
      this.saveButtonDisabled = false;
      this.dynamicDialogConfig.closable = false;
      this.createMode = true;
    } else {
      // VIEW or EDIT
      this.editModeButtonVisible = true;
      this.actionButtonsVisible = true;
      this.saveButtonDisabled = true;
      this.dynamicDialogConfig.closable = !this.editMode;
    }
  }
}
