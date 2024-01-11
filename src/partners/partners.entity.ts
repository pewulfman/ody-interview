import { Clients } from '../clients/clients.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Partners {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @Exclude() // Should exclude password from response but not working for now.
  password: string;

  @OneToMany(() => Clients, (client) => client.partner, { cascade: true })
  clients: Relation<Clients>[];
}
