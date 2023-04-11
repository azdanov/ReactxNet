export interface Activity {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host: ActivityAttendee;
  attendees: ActivityAttendee[];
}

export type ActivityFormValues = Pick<
  Activity,
  "id" | "title" | "description" | "category" | "date" | "city" | "venue"
>;

export interface ActivityAttendee {
  username: string;
  displayName: string;
  image?: string;
  bio?: string;
}
