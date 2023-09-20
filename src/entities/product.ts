import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { ActivityStatus } from "./enums/activity-status";
import { Activity } from "./activity";

// Define the Product entity
@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: ActivityStatus,
        default: ActivityStatus.INVALID,
    })
    status: ActivityStatus;

    @OneToMany(() => Activity, (activity) => activity.product)
    activities: Activity[];
}
