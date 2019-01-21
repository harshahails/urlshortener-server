const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlAnalyticsSchema = new Schema(
  {
    urlId: { type: Number, ref: "LinkModel", required: true },
    geo: { type: String },
    browser: { type: String },
    platform: { type: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("AnalyticsModel", UrlAnalyticsSchema);
