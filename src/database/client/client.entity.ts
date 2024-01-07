import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Travel } from '../travel/travel.entity';

@Entity()
export class Client {
  @PrimaryColumn()
  email: string;

  @Column()
  language: string;

  @Column()
  countryOfOrigin: string;

  @Column()
  countryOfResidence: string;

  @ManyToMany(() => Client, (client) => client.travels, {})
  travels: Travel[];
}
