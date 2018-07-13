import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Entry } from './Entry';
import { Tag } from './Tag';
import { Size } from 'lib';
import { CreateUserDTO } from '../dto';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: Size.User.username, unique: true })
  username: string;

  @Column({ length: Size.User.name })
  name: string;

  @Column({ type: 'date', nullable: true })
  dob?: string;

  @Column({ length: Size.User.gender, nullable: true })
  gender?: string;

  @Column('text')
  bio: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: number;

  @OneToMany(type => Entry, entry => entry.author, { onDelete: 'CASCADE' })
  entries: Entry[];

  @ManyToMany(type => Tag, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];

  // TODO: split into also updating user info with the update user endpoint
  constructor(userValues?: CreateUserDTO) {
    if (userValues) {
      const { username, name, dob, gender = 'U', bio = '' } = userValues;
  
      this.username = username;
      this.name = name;
      this.dob = dob;
      this.gender = gender;
      this.bio = bio;
    }
  }

  // TODO: lastOnline/lastActive entry (updates on any non-background request or login?)
  // TODO: check what is acceptable to log, and maybe log stuff with @BeforeInsert/other typeorm modifiers
}
