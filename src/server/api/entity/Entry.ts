import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Entry {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, author => author.entries)
  author: User;

  @Column({ default: 1 })
  isDraft: boolean;

  @Column({ default: 0 })
  isPublic: boolean;

  @Column()
  created: Date;

  @Column()
  published: Date;

  @Column()
  lastUpdated: Date;

  @Column({ length: 36 })
  title: string;

  @Column({ type: 'text' })
  text: string

}
