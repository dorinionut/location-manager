import { TitleCasePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';

export function deleteEmptyKeys(object = {}) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === '') {
        delete object[key];
      }
    }
  }
}

export function createDropdownOptions(optionsEnum): SelectItem[] {
  const titlePipe = new TitleCasePipe();
  const optionsList: SelectItem[] = [];

  for (const key in optionsEnum) {
    if (optionsEnum.hasOwnProperty(key)) {
      const element = optionsEnum[key];

      optionsList.push({
        label: titlePipe.transform(element.replace('_', ' ')),
        value: element
      });
    }
  }

  return optionsList;
}