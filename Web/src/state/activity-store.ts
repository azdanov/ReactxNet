import { makeAutoObservable, runInAction } from "mobx";

import client from "../api/client";
import { Activity } from "../models/activity";

class ActivityStore {
  private activitiesMap = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesEmpty() {
    return this.activitiesMap.size === 0;
  }

  get activitiesByDate() {
    return [...this.activitiesMap.values()].sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  async loadActivities() {
    this.setLoadingInitial(true);
    try {
      const activities: Activity[] = await client.get("/api/activities").json();
      runInAction(() => {
        for (const activity of activities) {
          this.activitiesMap.set(activity.id, activity);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  }

  async loadActivity(id: string) {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await client.get(`/api/activities/${id}`).json();
        runInAction(() => {
          if (activity) {
            this.selectedActivity = activity;
            this.activitiesMap.set(activity.id, activity);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoadingInitial(false);
      }
    }
    return activity;
  }

  async createActivity(activity: Activity) {
    this.setLoading(true);
    try {
      activity = await client.post(activity, "/api/activities").json();
      runInAction(() => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
    return activity;
  }

  async updateActivity(activity: Activity) {
    this.setLoading(true);
    try {
      activity = await client
        .put(activity, `/api/activities/${activity.id}`)
        .json();
      runInAction(() => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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

  private getActivity(id: string) {
    return this.activitiesMap.get(id);
  }
}

export default ActivityStore;
