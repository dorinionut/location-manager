import { IGeographicCoordinates } from './geographic-coordinates.model';
import { IAddress } from './address.model';
import { LOCATION_FUNCTION } from '../constant/location-function';

export interface ILocation {
  address: IAddress;
  coordinates: IGeographicCoordinates;
  function?: LOCATION_FUNCTION;
  id: number;
  name: string;
  normalizedName: string;
  resourceId: string;
  version: number;
}
