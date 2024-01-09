export class CreateClientDto {
  email: string;
  language: string;
  countryOfOrigin: string;
  countryOfDestination: string;
  travelDateStart: Date;
  travelDateEnd: Date;
}
