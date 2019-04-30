import { IGeographicCoordinates } from './geographic-coordinates.model';
import { IAddress } from './address.model';
import { LOCATION_FUNCTION } from '../constant/location-function';

export interface ILocation {
  name: string;
  normalizedName: string;
  coordinates: IGeographicCoordinates;
  address: IAddress;
  resourceId: string;
  version: number;
  function?: LOCATION_FUNCTION;
}
