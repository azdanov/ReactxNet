import { random } from "lodash-es";
import { toast } from "react-toastify";
import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";
// eslint-disable-next-line import/no-named-as-default
import FormDataAddon from "wretch/addons/formData";
import ProgressAddon from "wretch/addons/progress";
import { delay } from "wretch/middlewares";

import { store } from "../stores/store";

const client = wretch()
  .addon(AbortAddon())
  .addon(ProgressAddon())
  .addon(FormDataAddon)
  .middlewares([/* Simulate slow network */ delay(random(300, 1000))])
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
