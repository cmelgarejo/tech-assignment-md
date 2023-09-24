import { NextFunction, Request, Response } from "express";
import { ActivityService } from "./service";
import { Activity } from "./entity";
import validate from "./validation";

const activityService = new ActivityService();

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activity: Activity = req.body;
    validate.schema.parse(activity);
    const newActivity = await activityService.createActivity(activity);
    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
};

const Read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    const activity = await activityService.getActivity(id);
    res.json(activity);
  } catch (error) {
    next(error);
  }
};

const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    const activity: Activity = req.body;
    validate.schema.parse(activity);
    const updatedActivity = await activityService.updateActivity(id, activity);
    res.json(updatedActivity);
  } catch (error) {
    next(error);
  }
};

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    await activityService.deleteActivity(id);
    res.json({ message: "Activity deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await activityService.getActivities();
    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export default { Create, Read, Update, Delete, List };
