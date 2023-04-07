const mongoose = require('mongoose')
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: {
      type: String,
      default: ''
    }
  });
  

module.exports = mongoose.model('Transaction', transactionSchema);
