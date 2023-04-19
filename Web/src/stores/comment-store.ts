import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";

import { ChatComment } from "../models/comment";
import { store } from "./store";

class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection(activityId: string) {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`/hubs/chat?activityId=${activityId}`, {
          accessTokenFactory: () => store.userStore.user!.token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) => console.log("Error establishing connection:", error));

      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          for (const comment of comments) {
            comment.createdAt = new Date(
              (comment.createdAt as unknown as string).endsWith("Z")
                ? comment.createdAt
                : `${comment.createdAt}Z`
            );
          }
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        });
      });
    }
  }

  stopHubConnection() {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection:", error));
  }

  clearComments() {
    this.comments = [];
  }

  async addComment({ body }: { body: string }) {
    try {
      await this.hubConnection?.invoke("SendComment", {
        body,
        activityId: store.activityStore.selectedActivity!.id,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default CommentStore;
