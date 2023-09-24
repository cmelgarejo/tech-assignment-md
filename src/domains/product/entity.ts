import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from "typeorm";
import { Status } from "./enums/status";
import { Activity } from "../activity/entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column({
  //   type: "enum",
  //   enum: Status,
  //   default: Status.INVALID,
  // })
  status: Status;

  @OneToMany(() => Activity, (activity) => activity.product, { eager: true })
  activities: Activity[];

  @AfterLoad()
  setProductStatus() {
    console.log("setProductStatus, fire!", this.activities);
    // Check if there is at least one activity
    if (!this.activities || this.activities?.length === 0) {
      this.status = Status.INVALID;
      return;
    }
    console.log("not empty");
    // Filter activities with no output connections
    const finalActivities = this.activities.filter((activity) => !activity.outputs || activity.outputs.length === 0);
    // And if there is just one final activity
    if (finalActivities.length !== 1) {
      this.status = Status.INVALID;
      return;
    }

    // Check for circular dependencies (recursively) using a set to record visited activities
    const visitedActivities = new Set<number>();
    const checkCircularDependencies = (activity: Activity) => {
      if (activity && activity.id !== undefined) {
        if (visitedActivities.has(activity.id)) return true; // Circular dependency detected
        visitedActivities.add(activity.id);
        if (activity.outputs)
          for (const connection of activity.outputs) if (checkCircularDependencies(connection.toActivity)) return true;
        visitedActivities.delete(activity.id);
        return false; // No circular dependency detected
      }
    };

    if (checkCircularDependencies(finalActivities[0])) {
      this.status = Status.INVALID;
      return;
    }

    this.status = Status.VALID;
  }
}
