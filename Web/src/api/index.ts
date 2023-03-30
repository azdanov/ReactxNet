import { random } from "lodash-es";
import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";
import ProgressAddon from "wretch/addons/progress";
import { delay } from "wretch/middlewares";

const api = wretch()
  .addon(AbortAddon())
  .addon(ProgressAddon())
  .middlewares([/* Simulate slow network */ delay(random(1000, 3000))]);
export default api;
