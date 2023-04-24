import { observer } from "mobx-react-lite";
// eslint-disable-next-line import/no-named-as-default
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

import { useStore } from "../../../stores/store";

function ActivityFilters() {
  const { activityStore } = useStore();
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 30 }}>
        <Header
          icon="filter"
          attached
          color="blue"
          content="Filters"
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottom: 0,
          }}
        />
        <Menu.Item
          content="All Activities"
          active={activityStore.filters.has("all")}
          onClick={() => activityStore.setFilter("all")}
        />
        <Menu.Item
          content="I'm going"
          active={activityStore.filters.has("isGoing")}
          onClick={() => activityStore.setFilter("isGoing")}
        />
        <Menu.Item
          content="I'm hosting"
          active={activityStore.filters.has("isHost")}
          onClick={() => activityStore.setFilter("isHost")}
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date) => activityStore.setFilter("startDate", date as Date)}
        value={activityStore.filters.get("startDate") || new Date()}
      />
    </>
  );
}

export default observer(ActivityFilters);
