import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import InfiniteScroll, { InfiniteScroll } from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";

import { PagingParams } from "../../../models/pagination";
import { useStore } from "../../../stores/store";
import ActivityFilters from "./activity-filters";
import ActivityList from "./activity-list";
import ActivityListItemPlaceholder from "./activity-list-item-placeholder";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    activityStore.setPagingParams(
      new PagingParams(activityStore.pagingParams.pageNumber + 1)
    );
    activityStore.loadActivities().finally(() => setLoadingNext(false));
  }

  useEffect(() => {
    const controller = new AbortController();
    activityStore.loadActivities(controller).catch(console.error);
    return () => controller.abort();
  }, [activityStore]);

  return (
    <Grid>
      <Grid.Column width="10">
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              activityStore.pagination &&
              activityStore.pagination.currentPage <
                activityStore.pagination.totalPages
            }
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
      </Grid.Column>
      <Grid.Column width="10">
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDashboard);
