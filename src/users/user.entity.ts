import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true})
    email: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column()
    salt: string
}