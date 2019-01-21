const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountSchema = new Schema(
  {
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("CounterModel", CountSchema);
