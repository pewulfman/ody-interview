import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryColumn()
  email: string;

  @Column()
  language: string;

  @Column()
  countryOfOrigin: string;

  @Column()
  countryOfResidence: string;

  @Column()
  travelDateStart: Date;

  @Column()
  travelDateEnd: Date;
}
