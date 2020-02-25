import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Gif } from "src/gifs/gif.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToMany(
    type => Gif,
    gif => gif.user,
    { eager: false },
  )
  gif: Gif[];

  async comparePasswords(password: string): Promise<boolean> {
    if (this.password === (await bcrypt.hash(password, this.salt))) return true;
    return false;
  }
}
