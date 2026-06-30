import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'events',
})
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
