import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp' })
  createdTime: number;

  @Column({ type: 'timestamp', nullable: true })
  published?: number;

  @UpdateDateColumn({ type: 'timestamp' })
  lastUpdated: number;

  @Column({ length: 36 })
  title: string;

  @Column({ type: 'text' })
  text: string;

  constructor(entryValues?: ModifyEntryDTO) {
    if (entryValues) {
      this.setValues(entryValues);
    }
  }

  setValues(entryValues: ModifyEntryDTO) {
    this.title = entryValues.title || '';
    this.text = entryValues.text || '';
  }
}
