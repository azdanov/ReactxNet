import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";

import { useStore } from "../../../state/store";
import ActivityListItem from "./activity-list-item";

function ActivityList() {
  const { activityStore } = useStore();

  return (
    <>
      {activityStore.groupedActivitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Header size="small" color="blue">
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </Fragment>
      ))}
    </>
  );
}

export default observer(ActivityList);
