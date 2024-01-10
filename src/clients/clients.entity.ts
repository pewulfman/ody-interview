import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Partners } from '../partners/partners.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  language: string;

  @Column()
  @ApiProperty()
  countryOfOrigin: string;

  @Column()
  @ApiProperty()
  countryOfDestination: string;

  @Column()
  @ApiProperty()
  travelDateStart: Date;

  @Column()
  @ApiProperty()
  travelDateEnd: Date;

  @ManyToOne(() => Partners, (partner) => partner.clients, {
    cascade: ['update', 'recover'],
  })
  partner: Relation<Partners>;

  constructor(partial: Partial<Clients>) {
    Object.assign(this, partial);
  }
}
