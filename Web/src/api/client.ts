import { random } from "lodash-es";
import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";
import ProgressAddon from "wretch/addons/progress";
import { delay } from "wretch/middlewares";

const client = wretch()
  .addon(AbortAddon())
  .addon(ProgressAddon())
  .middlewares([/* Simulate slow network */ delay(random(300, 1000))]);
export default client;
