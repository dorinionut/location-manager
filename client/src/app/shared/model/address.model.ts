import { CONTINENT } from '../constant/continent.enum';

export interface IAddress {
  city: string;
  country: string;
  continent: CONTINENT;
  streetName: string;
  streetNumber?: string;
  postalCode?: string;
  administrativeLevel2?: string;
  administrativeLevel1?: string;
}