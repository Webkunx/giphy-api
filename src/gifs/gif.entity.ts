import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  AfterUpdate,
} from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Gif extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column()
  likes: number;

  @ManyToMany(
    type => User,
    user => user.gif,
    { eager: true },
  )
  @JoinTable()
  user: User[];
}
