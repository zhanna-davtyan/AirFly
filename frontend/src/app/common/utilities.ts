import {DialogService} from 'primeng/dynamicdialog';
import {isEqual, omit} from 'lodash';
import {ChangeDetectorRef} from '@angular/core';

export class Utilities {

  public static destroyPendingDialogs(dialogService: DialogService) {
    dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

  public static equals(object1: any, object2: any, rootPropertiesToIgnore?: string[]) {
    if (rootPropertiesToIgnore && rootPropertiesToIgnore.length > 0) {
      return isEqual(omit(object1, rootPropertiesToIgnore), omit(object2, rootPropertiesToIgnore));
    } else {
      return isEqual(omit(object1), omit(object2));
    }
  }


  public static showDynamicDialogAfterContentLoadingIsComplete(changeDetectorRef: ChangeDetectorRef) {
    const invisibleElements = document.getElementsByClassName('my-invisible');
    for (let x = 0; x < invisibleElements.length; x++) {
      invisibleElements[x].classList.remove('my-invisible');
    }
    changeDetectorRef.markForCheck();
  }
}
