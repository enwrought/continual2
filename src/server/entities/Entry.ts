import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { ModifyEntryDTO } from '../dto';

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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: string;

  @Column({ type: 'datetime', nullable: true })
  published?: string;

  @Column('datetime')
  lastUpdated: string;

  @Column({ length: 36 })
  title: string;

  @Column({ type: 'text' })
  text: string;

  constructor(entryValues?: ModifyEntryDTO) {
    if (entryValues) {
      const currTime = (new Date()).toISOString();
      this.setValues(entryValues, currTime);
    }
  }

  setValues(entryValues: ModifyEntryDTO, currTime: string = (new Date()).toISOString()) {
    this.title = entryValues.title || '';
    this.text = entryValues.text || '';
    this.lastUpdated = currTime;
  }

}
