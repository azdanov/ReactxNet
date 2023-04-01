import { makeAutoObservable, runInAction } from "mobx";

import api from "../api";
import { Activity } from "../models/activity";

class ActivityStore {
  activitiesMap = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return [...this.activitiesMap.values()].sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  async loadActivities() {
    this.setLoadingInitial(true);
    try {
      const activities: Activity[] = await api.get("/api/activities").json();
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

  async createActivity(activity: Activity) {
    this.setLoading(true);
    try {
      activity.id = crypto.randomUUID();
      activity = await api.post(activity, "/api/activities").json();
      runInAction(() => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  async updateActivity(activity: Activity) {
    this.setLoading(true);
    try {
      activity = await api
        .put(activity, `/api/activities/${activity.id}`)
        .json();
      runInAction(() => {
        this.activitiesMap.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteActivity(id: string) {
    this.setLoading(true);
    try {
      await api.delete(`/api/activities/${id}`).res();
      runInAction(() => {
        this.activitiesMap.delete(id);
        this.selectedActivity = undefined;
        this.editMode = false;
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

  selectActivity(id: string) {
    this.selectedActivity = this.activitiesMap.get(id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm(id?: string) {
    this.selectedActivity = id ? this.activitiesMap.get(id) : undefined;
    this.editMode = true;
  }

  closeForm() {
    this.editMode = false;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }
}

export default ActivityStore;
