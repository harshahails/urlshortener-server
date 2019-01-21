const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountSchema = require("./count");

const LongUrlSchema = new Schema(
  {
    _id: { type: Number },
    url: { type: String, required: true },
    hits: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

LongUrlSchema.pre("save", function(next) {
  const link = this;
  CountSchema.findByIdAndUpdate(
    "linkEntryCount",
    { $inc: { count: 1 } },
    { new: true, upsert: true },
    function(err, counter) {
      if (err) return next(err);
      link._id = counter.count;
      next();
    }
  );
});

module.exports = mongoose.model("LinkModel", LongUrlSchema);
