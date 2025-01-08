const { mongoose, Schema } = require("mongoose");

const Bookschema = new Schema({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  Abstraction:{type:String,require:true},
  printPrice:{type:Number,require:true},
  ebookPrice:{type:Number,require:true},
  files: [
    {
      originalName: { type: String, required: true },
      filePath: { type: String, required: true },
      fileSize: { type: Number, required: true },
    },
  ],
});

exports.book = mongoose.model("book", Bookschema);
