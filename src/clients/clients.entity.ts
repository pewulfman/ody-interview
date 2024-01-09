import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Partner } from '../partners/partners.entity';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @ManyToOne(() => Partner, (partner) => partner.clients)
  partner: Relation<Partner>;
}
