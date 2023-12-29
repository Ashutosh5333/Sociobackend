const mongoose = require("mongoose");


const MasaiSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [5, "Title should be at least 5 characters long"],
      maxlength: [500, "Title should not exceed 50 characters"],
    },
    device: {
      type: String,
    },
    userId: {
      type: String,
      required:true
    },
    postedby: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please provide the ID of the user who posted"],
    },
  },
  {
    timestamps: true,
  }
);

const SocioMasaiModel = mongoose.model("socialmasai", MasaiSchema);

module.exports = {
  SocioMasaiModel,
};
