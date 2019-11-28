import { Schema, model } from 'mongoose';

const ReportSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    won_time: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model('Report', ReportSchema);
