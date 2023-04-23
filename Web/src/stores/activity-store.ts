import { compareAsc, format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";

import client from "../api/client";
import { Activity, ActivityFormValues } from "../models/activity";
import {
  PaginatedResult,
  Pagination,
  PagingParams,
} from "../models/pagination";
import { store } from "./store";

class ActivityStore {
  selectedActivity: Activity | undefined;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | undefined;
  pagingParams = new PagingParams();
  filters = new Map().set("all", true);

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

    reaction(
      () => this.filters.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activitiesMap.clear();
        this.loadActivities().then();
      }
    );
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

  setPagingParams(pagingParams: PagingParams) {
    this.pagingParams = pagingParams;
  }

  setFilter = (filter: string, value?: unknown) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const resetFilters = () => {
      for (const [key] of this.filters.entries()) {
        if (key !== "startDate") this.filters.delete(key);
      }
    };

    switch (filter) {
      case "all": {
        resetFilters();
        this.filters.set("all", true);
        break;
      }
      case "isGoing": {
        resetFilters();
        this.filters.set("isGoing", true);
        break;
      }
      case "isHost": {
        resetFilters();
        this.filters.set("isHost", true);
        break;
      }
      case "startDate": {
        this.filters.delete("startDate");
        this.filters.set("startDate", (value as Date).toISOString());
        break;
      }
    }
  };

  async loadActivities(controller?: AbortController) {
    this.setLoadingInitial(true);
    try {
      const activities: PaginatedResult<Activity> = await (controller
        ? client.signal(controller)
        : client
      )
        .query({ ...this.pagingParams, ...Object.fromEntries(this.filters) })
        .get("/api/activities")
        .res(async (response) => {
          const pagination = response.headers.get("Pagination");
          return new PaginatedResult(
            (await response.json()) as Activity[],
            JSON.parse(pagination || "null") as Pagination
          );
        });
      if (activities) {
        this.setActivities(activities.data);
        this.setPagination(activities.pagination);
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
    await client.post({}, `/api/activities/${activityId}/attendances`).res();
  }

  updateAttendeeFollowing(username: string) {
    for (const [, activity] of this.activitiesMap) {
      for (const attendee of activity.attendees) {
        if (attendee.username === username) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      }
    }
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

  private setPagination(pagination: Pagination) {
    this.pagination = pagination;
  }
}

export default ActivityStore;
