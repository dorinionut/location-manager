import { TitleCasePipe } from '@angular/common';
import { SelectItem } from 'primeng/api';
import { ILocation } from '@app/model/location.model';

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

export function getLocationId(location: ILocation): number {
  return parseInt(location.resourceId.replace(/.+\/(\d+)$/g, '$1'), 10);
}

export function mapLocationId(location: ILocation): ILocation {
  location.id = getLocationId(location);
  return location;
}