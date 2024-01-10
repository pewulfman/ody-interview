import { Clients } from '../clients/clients.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Partners {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Clients, (client) => client.partner, { cascade: ['update'] })
  clients: Relation<Clients>[];
}
