import { Activity, ActivityConnection } from "./entity";
import { AppDataSource } from "../../orm";

export class ActivityService {
  private activityRepository = AppDataSource.getRepository(Activity);
  private activityConnectionRepository = AppDataSource.getRepository(ActivityConnection);

  async createActivity(input: Activity): Promise<Activity> {
    return this.activityRepository.save(this.activityRepository.create(input as Activity));
  }

  async getActivity(id: number): Promise<Activity> {
    return this.activityRepository.findOneByOrFail({ id });
  }

  async updateActivity(id: number, input: Activity): Promise<Activity> {
    input.id = id;
    if (input.inputs) {
      input.inputs.forEach(async (acInput: ActivityConnection) => {
        await this.activityConnectionRepository.save({
          toActivity: { id: id },
          fromActivity: { id: acInput.fromActivity.id },
          value: acInput.value,
        });
      });
      delete input.inputs;
    }
    if (input.outputs) {
      input.outputs.forEach(async (acOutput: ActivityConnection) => {
        console.log(acOutput);
        await this.activityConnectionRepository.save({
          fromActivity: { id: id },
          toActivity: { id: acOutput.toActivity.id },
          value: acOutput.value,
        });
      });
      delete input.outputs;
    }
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
