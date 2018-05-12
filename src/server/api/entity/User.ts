import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  // TODO: should we have an id in case they change username?
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @PrimaryColumn()
  @Column({
    length: 20
  })
  username: string;

  @Column({
    length: 36
  })
  name: string;

  @Column()
  dob?: Date;

  @Column({
    length: 1
  })
  gender?: string;

  @Column('text')
  bio: string;

  @Column()
  createdTime?: Date;
}
