import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    length: 200,
  })
  name: string;

  @Column({
    nullable: true,
  })
  email: string;
}
