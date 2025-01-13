import { merge } from "webpack-merge";
import { common } from "./webpack.common.cjs";

export default merge(common, {
  mode: "production",
});
