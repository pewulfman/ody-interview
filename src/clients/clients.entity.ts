import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Partners } from '../partners/partners.entity';

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
  countryOfDestination: string;

  @Column()
  travelDateStart: Date;

  @Column()
  travelDateEnd: Date;

  @ManyToOne(() => Partners, (partner) => partner.clients, { cascade: true })
  partner: Relation<Partners>;
}
