import wretch from "wretch";
import AbortAddon from "wretch/addons/abort";
import ProgressAddon from "wretch/addons/progress";

const api = wretch()
  .addon(AbortAddon())
  .addon(ProgressAddon())
  .resolve((r) => r.json());

export default api;
