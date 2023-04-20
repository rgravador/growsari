import mongoose, { Schema, Document } from 'mongoose';

export interface IAdapt extends Document {
  url: string;
  adapted: boolean;
  adaptedBy: string;
}

const DogSchema: Schema = new Schema({
  url: { type: String, required: true },
  adapted: { type: Boolean, required: true, dafault: false },
  adaptedBy: { type: String, required: true, dafault: '' }
});

export default mongoose.model<IAdapt>('Adapt', DogSchema);