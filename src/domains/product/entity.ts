import { Entity, PrimaryGeneratedColumn, Column, OneToMany, AfterLoad } from "typeorm";
import { Status } from "./enums/status";
import { Activity } from "../activity/entity";
import { checkCircularDependencies } from "../../util";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // "virtual"/calculated/derived field
  status?: Status;

  @OneToMany(() => Activity, (activity) => activity.product, { eager: true, onDelete: "CASCADE" })
  activities: Activity[];

  @AfterLoad()
  setProductStatus() {
    // console.debug("setProductStatus, fire!");
    // Check if there is at least one activity
    if (!this.activities || this.activities?.length === 0) {
      this.status = Status.INVALID;
      return;
    }
    // console.debug("not empty activities");
    // Filter activities with no output connections
    const finalActivities = this.activities.filter((activity) => !activity.outputs || activity.outputs.length === 0);
    // And if there is just one final activity
    if (finalActivities.length !== 1) {
      this.status = Status.INVALID;
      return;
    }
    // console.debug("just 1 final activity, we good, now check if there's circular dependencies");
    if (checkCircularDependencies(finalActivities[0])) {
      this.status = Status.INVALID;
      return;
    }
    // console.debug("set clean, all unique values");
    this.status = Status.VALID;
  }
}
