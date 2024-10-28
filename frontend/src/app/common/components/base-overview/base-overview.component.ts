import {Component, ViewChild} from '@angular/core';
import {Table} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {BaseComponent} from "../base/base.component";

@Component({
  standalone: true,
  selector: 'app-base-overview',
  templateUrl: './base-overview.component.html',
  styleUrls: ['./base-overview.component.css']
})
export abstract class BaseOverviewComponent<DTO> extends BaseComponent {
  @ViewChild('table') table!: Table;

  showAllColumns = false;
  columns!: any[];
  dtos: DTO[] = [];
  filter!: string;
  showDialogDetails = true;

  protected constructor(
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public dynamicDialogRef: DynamicDialogRef
  ) {
    super();
  }

  clearTableWithSingleSort(table: Table, sortFieldName: string, asc: boolean) {
    table.sortField = sortFieldName;
    table.sortOrder = asc ? 1 : -1; // 1 = ASC, -1 = DESC
    table.sortSingle();
    table.clear();
    this.filter = '';
  }

  clearTableWithMultiSort(table: Table) {
    table.clear();
    this.filter = '';
  }

  applyFilterGlobal($event: any, filter: any) {
    this.table?.filterGlobal(($event.target as HTMLInputElement).value, filter);
  }


}
