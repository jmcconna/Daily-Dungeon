const { Schema, model } = require('mongoose');

//! need to define all the bad outcomes
const environmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  badOutcomes: [
    {
      type: String,

    },
  ],
  monsters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Monster',
    },
  ],
});



const Environment = model('Environment', environmentSchema);

module.exports = Environment;
