import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Contact from "./contacts..entity";
import { Date } from "./date.entity";
import { hashSync } from "bcryptjs";

@Entity("clients")
export default class Client extends Date {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  @Column()
  name: string;
  @Column({ length: 120 })
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  telefone: string;
  @OneToMany(() => Contact, (contact) => contact.user, {
    nullable: true,
  })
  contacts: Contact[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
