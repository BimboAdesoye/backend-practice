const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    party: {
      type: String,
      required: true,
    },
    candidate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Voters = mongoose.model("Voter", VoterSchema);

module.exports = Voters;
