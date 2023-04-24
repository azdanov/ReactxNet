import { random } from "lodash-es";
import { toast } from "react-toastify";
import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";
// eslint-disable-next-line import/no-named-as-default
import FormDataAddon from "wretch/addons/formData";
import ProgressAddon from "wretch/addons/progress";
// eslint-disable-next-line import/no-named-as-default
import QueryStringAddon from "wretch/addons/queryString";
import { delay } from "wretch/middlewares";
import { ConfiguredMiddleware } from "wretch/types";

import { store } from "../stores/store";

const middlewares: ConfiguredMiddleware[] = [];

if (import.meta.env.DEV) {
  /* Simulate real network */
  middlewares.push(delay(random(300, 1000)));
}

const client = wretch()
  .addon(AbortAddon())
  .addon(ProgressAddon())
  .addon(FormDataAddon)
  .addon(QueryStringAddon)
  .middlewares(middlewares)
  .defer((request) => {
    if (store.userStore.token) {
      return request.auth(`Bearer ${store.userStore.token}`);
    }
    return request;
  })
  .errorType("json")
  .catcher("AbortError", (error) => console.log(error))
  .catcher(400, (error) => {
    toast.error(error.json.title);
    throw error;
  })
  .catcher(401, (error) => {
    toast.error(error.json.title);
    throw error;
  })
  .catcher(500, (error) => {
    toast.error(error.json.title);
    throw error;
  });

export default client;
