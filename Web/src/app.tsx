import { useEffect, useState } from "react";
import { Header, Image, List } from "semantic-ui-react";

import client from "./api";
import surfing from "./assets/surfing.png";
import { Activity } from "./types";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    client
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((activities) => {
        setActivities(activities);
      });
  }, []);

  return (
    <div className="App">
      <Header as="h1">
        <Image
          avatar
          src={surfing}
          size="mini"
          verticalAlign="middle"
          alt="Surfing"
          style={{ marginTop: "-0.45rem" }}
        />
        ReactxNet
      </Header>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
