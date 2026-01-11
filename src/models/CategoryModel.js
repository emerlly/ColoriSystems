const { mongoose } = require('./ConnectionModel');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true
    },

    description: {
      type: String,
      trim: true
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);


categorySchema.index({ name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
