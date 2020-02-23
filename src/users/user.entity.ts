import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import * as bcrypt from "bcrypt";

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

  async comparePasswords(password: string): Promise<boolean> {
    if (this.password === (await bcrypt.hash(password, this.salt))) return true;
    return false;
  }
}
