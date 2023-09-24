import { Activity } from "./domains/activity/entity";

// Check for circular dependencies (recursively) using a set to record visited activities
const visitedActivities = new Set<number>();
export const checkCircularDependencies = (activity: Activity) => {
  if (activity && activity.id !== undefined) {
    if (visitedActivities.has(activity.id)) return true; // Circular dependency detected
    visitedActivities.add(activity.id);
    if (activity.outputs)
      for (const connection of activity.outputs) if (checkCircularDependencies(connection.toActivity)) return true;
    visitedActivities.delete(activity.id);
    return false; // No circular dependency detected
  }
};
