import { observer } from "mobx-react-lite";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

function ActivityFilters() {
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
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
}

export default observer(ActivityFilters);
