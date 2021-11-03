const { Schema, model, SchemaTypes } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { ValidInfoContact } = require('../config/constants');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: ValidInfoContact.MIN_NAME_LENGTH,
      max: ValidInfoContact.MAX_NAME_LENGTH,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

contactSchema.virtual('status').get(function () {
  if (this.isFavourite === true) {
    return 'bro';
  }
  return 'not bro';
});

contactSchema.path('name').validate(function (value) {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema);

module.exports = Contact;
