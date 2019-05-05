import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { ModifyEntryDTO } from '../dto';

/**
 * CalendarEntries can be exported from other sources and are not shown to the public.
 */
@Entity()
export class CalendarEntry {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, author => author.entries)
  author: Promise<User>;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  lastUpdated: Date;

  @Column({ length: 36 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  // constructor(entryValues?: ModifyEntryDTO) {
  //   if (entryValues) {
  //     this.setValues(entryValues);
  //   }
  // }

  // setValues(entryValues: ModifyEntryDTO) {
  //   this.title = entryValues.title || '';
  //   this.description = entryValues.text || '';
  // }
}
