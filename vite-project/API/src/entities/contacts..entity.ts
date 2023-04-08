import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./clients.entity";
import { Date } from "./date.entity";

@Entity("contacts")
export default class Contact extends Date {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  telefone: string;
  @ManyToOne(() => Client, (client) => client.contacts, { onDelete: "CASCADE" })
  user: Client;
}
