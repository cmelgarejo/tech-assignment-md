import { Activity } from "./entity";
import { AppDataSource } from "../../orm";

export class ActivityService {
  private activityRepository = AppDataSource.getRepository(Activity);

  async createActivity(input: Activity): Promise<Activity> {
    const newActivity = this.activityRepository.save(this.activityRepository.create(input as Activity));
    return newActivity;
  }

  async getActivity(id: number): Promise<Activity> {
    return this.activityRepository.findOneByOrFail({ id });
  }

  async updateActivity(id: number, input: Activity): Promise<Activity> {
    await this.activityRepository.update(id, input);
    return this.getActivity(id);
  }

  async deleteActivity(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }

  async getActivities(): Promise<Activity[]> {
    return this.activityRepository.find();
  }
}
