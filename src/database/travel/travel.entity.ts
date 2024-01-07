import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../client/client.entity';

@Entity()
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  travelDateStart: Date;

  @Column()
  travelDateEnd: Date;

  @ManyToMany(() => Client, (client) => client.travels, {})
  @JoinTable()
  clients: Client[];
}
