import { compareAsc, format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";

import client from "../api/client";
import { Activity, ActivityFormValues } from "../models/activity";
import { store } from "./store";

class ActivityStore {
  selectedActivity: Activity | undefined;
  loading = false;
  loadingInitial = false;
  readonly categoryOptions = [
    { key: "drinks", text: "Drinks", value: "drinks" },
    { key: "culture", text: "Culture", value: "culture" },
    { key: "film", text: "Film", value: "film" },
    { key: "food", text: "Food", value: "food" },
    { key: "music", text: "Music", value: "music" },
    { key: "travel", text: "Travel", value: "travel" },
  ];
  private activitiesMap = new Map<string, Activity>();

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return [...this.activitiesMap.values()].sort((a, b) =>
      compareAsc(a.date, b.date)
    );
  }

  get groupedActivitiesByDate() {
    const groupedActivities: { [key: string]: Activity[] } = {};

    for (const activity of this.activitiesByDate) {
      const date = format(activity.date, "dd MMM yyyy");
      groupedActivities[date] = groupedActivities[date]
        ? [...groupedActivities[date], activity]
        : [activity];
    }

    return Object.entries(groupedActivities);
  }

  async loadActivities(controller?: AbortController) {
    this.setLoadingInitial(true);
    try {
      const activities: Activity[] = await (controller
        ? client.signal(controller)
        : client
      )
        .get("/api/activities")
        .json();
      if (activities) {
        this.setActivities(activities);
      }
    } finally {
      this.setLoadingInitial(false);
    }
  }

  async loadActivity(id: string, controller?: AbortController) {
    this.setLoadingInitial(true);

    let activity: Activity | undefined;
    try {
      activity = await (controller ? client.signal(controller) : client)
        .get(`/api/activities/${id}`)
        .json();
      if (activity) {
        this.setActivity(activity);
        this.setSelectedActivity(activity);
      }
    } finally {
      this.setLoadingInitial(false);
    }
    return activity;
  }

  async createActivity(activity: ActivityFormValues) {
    await client.post(activity, "/api/activities").res();
  }

  async updateActivity(activity: ActivityFormValues) {
    await client.put(activity, `/api/activities/${activity.id}`).res();
  }

  async deleteActivity(id: string) {
    await client.delete(`/api/activities/${id}`).res();
    runInAction(() => {
      this.activitiesMap.delete(id);
      this.selectedActivity = undefined;
    });
    await this.loadActivities();
  }

  async updateAttendance(activityId: string) {
    await client
      .post({}, `/api/activities/${activityId}/attend-activity`)
      .res();
  }

  setLoadingInitial(loading: boolean) {
    this.loadingInitial = loading;
  }

  setActivities(activities: Activity[]) {
    for (const activity of activities) this.setActivity(activity);
  }

  clearSelectedActivity() {
    this.selectedActivity = undefined;
  }

  private setSelectedActivity(activity?: Activity) {
    this.selectedActivity = activity;
  }

  private setActivity(activity: Activity) {
    const user = store.userStore.user;
    if (user) {
      activity.isGoing = activity.attendees.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees.find(
        (a) => a.username === activity.hostUsername
      )!;
    }
    activity.date = new Date(activity.date);
    this.activitiesMap.set(activity.id, activity);
  }

  private getActivity(id: string) {
    return this.activitiesMap.get(id);
  }
}

export default ActivityStore;
