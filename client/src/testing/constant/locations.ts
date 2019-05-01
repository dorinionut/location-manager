import { ILocation } from '@app/model/location.model';
import { CONTINENT } from '@app/constant/continent.enum';
import { LOCATION_FUNCTION } from '@app/constant/location-function';

export const mockLocation: ILocation = {
  name: 'Test location Bârnești',
  normalizedName: 'test location barnesti',
  coordinates: {
    latitudeInDegrees: -123.456,
    longitudeInDegrees: 12.3456
  },
  address: {
    continent: CONTINENT.EUROPE,
    country: 'CH',
    city: 'Zurich',
    streetName: 'Strasse'
  },
  function: LOCATION_FUNCTION.AIRPORT,
  resourceId: '/locations/65',
  version: 1,
  id: 65
};

export const mockLocationList: ILocation[] = [
  mockLocation,
  {
    name: 'Test location Cernăuți',
    normalizedName: 'test location cernauti',
    coordinates: {
      latitudeInDegrees: 123.456,
      longitudeInDegrees: -12.3456
    },
    address: {
      continent: CONTINENT.EUROPE,
      country: 'FR',
      city: 'Paris',
      streetName: 'Dans la rue'
    },
    function: LOCATION_FUNCTION.RAIL_TERMINAL,
    resourceId: '/locations/99',
    version: 1,
    id: 99
  }
];
