import { compareAsc, format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";

import client from "../api/client";
import { Activity } from "../models/activity";

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

  async loadActivities(controller: AbortController) {
    this.setLoadingInitial(true);
    try {
      const activities: Activity[] = await client
        .signal(controller)
        .get("/api/activities")
        .json();
      if (activities) {
        for (const activity of activities) {
          this.setActivity(activity);
        }
      }
    } finally {
      this.setLoadingInitial(false);
    }
  }

  async loadActivity(id: string, controller: AbortController) {
    let activity = this.getActivity(id);
    if (activity) {
      this.setSelectedActivity(activity);
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await client
          .signal(controller)
          .get(`/api/activities/${id}`)
          .json();
        if (activity) {
          this.setActivity(activity);
          this.setSelectedActivity(activity);
        }
      } finally {
        this.setLoadingInitial(false);
      }
    }
    return activity;
  }

  async createActivity(activity: Activity) {
    this.setLoading(true);
    try {
      await client.post(activity, "/api/activities").res();
      this.setActivity(activity);
      this.setSelectedActivity(activity);
    } finally {
      this.setLoading(false);
    }
    return activity;
  }

  async updateActivity(activity: Activity) {
    this.setLoading(true);
    try {
      await client.put(activity, `/api/activities/${activity.id}`).res();
      this.setActivity(activity);
      this.setSelectedActivity(activity);
    } finally {
      this.setLoading(false);
    }
    return activity;
  }

  async deleteActivity(id: string) {
    this.setLoading(true);
    try {
      await client.delete(`/api/activities/${id}`).res();
      runInAction(() => {
        this.activitiesMap.delete(id);
        this.selectedActivity = undefined;
      });
    } finally {
      this.setLoading(false);
    }
  }

  setLoadingInitial(loading: boolean) {
    this.loadingInitial = loading;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setActivities(activities: Activity[]) {
    for (const activity of activities) this.setActivity(activity);
  }

  private setSelectedActivity(activity?: Activity) {
    this.selectedActivity = activity;
  }

  private setActivity(activity: Activity) {
    activity.date = new Date(activity.date);
    this.activitiesMap.set(activity.id, activity);
  }

  private getActivity(id: string) {
    return this.activitiesMap.get(id);
  }
}

export default ActivityStore;
