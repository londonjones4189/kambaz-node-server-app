import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   available: String,
   due: String,
   until: String,
   points: Number,
   newAssign: Boolean
 },
 { collection: "assignments" }
);
export default assignmentSchema;