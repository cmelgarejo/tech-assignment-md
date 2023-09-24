import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Index, Check } from "typeorm";
import { Product } from "../product/entity";

@Entity("activities")
export class Activity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.activities)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(() => ActivityConnection, (connection) => connection.fromActivity, { eager: true, cascade: true })
  outputs?: ActivityConnection[];

  @OneToMany(() => ActivityConnection, (connection) => connection.toActivity, { eager: true, cascade: true })
  inputs?: ActivityConnection[];
}

@Entity("activity_connections")
@Index(["fromActivity", "toActivity"], { unique: true })
@Check(`"value" != 0`)
export class ActivityConnection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, (activity) => activity.outputs)
  @JoinColumn({ name: "from_activity_id" })
  fromActivity: Activity;

  @ManyToOne(() => Activity, (activity) => activity.inputs)
  @JoinColumn({ name: "to_activity_id" })
  toActivity: Activity;

  @Column()
  value: number;
}
