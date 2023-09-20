import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Product } from "./product";

@Entity("activities")
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Product, (product) => product.activities)
    @JoinColumn({ name: "product_id" })
    product: Product;

    @OneToMany(
        () => ActivityConnection,
        (connection) => connection.fromActivity,
    )
    outgoingConnections: ActivityConnection[];

    @OneToMany(() => ActivityConnection, (connection) => connection.toActivity)
    incomingConnections: ActivityConnection[];
}

@Entity("activity_connections")
export class ActivityConnection {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Activity, (activity) => activity.outgoingConnections)
    @JoinColumn({ name: "from_activity_id" })
    fromActivity: Activity;

    @ManyToOne(() => Activity, (activity) => activity.incomingConnections)
    @JoinColumn({ name: "to_activity_id" })
    toActivity: Activity;

    @Column()
    value: number;
}
