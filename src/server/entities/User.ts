import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Entry } from './Entry';
import { Tag } from './Tag';
import { Size } from '../../lib/constants';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: Size.User.username })
  username: string;

  @Column({ length: Size.User.name })
  name: string;

  @Column({ nullable: true })
  dob?: Date;

  @Column({ length: Size.User.gender, nullable: true })
  gender?: string;

  @Column('text')
  bio: string;

  @Column()
  createdTime?: Date;

  @OneToMany(type => Entry, entry => entry.author)
  entries: Entry[]

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[]
}
