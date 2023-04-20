import mongoose, { Schema, Document } from 'mongoose';

export interface IDog extends Document {
  url: string;
  isFavorite: boolean;
  adaptedBy: string;
}

const DogSchema: Schema = new Schema({
  url: { type: String, required: true },
  isFavorite: { type: Boolean, required: true, dafault: false },
  adaptedBy: { type: String, required: true, dafault: '' }
});

export default mongoose.model<IDog>('Dog', DogSchema);