import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Size } from '../../../lib/constants';

// TODO: once we think more about how we will use tags,
// we'll connect it to entries/time tables and create endpoints
@Entity()
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: Size.Tag.name })
  name: string;
}
