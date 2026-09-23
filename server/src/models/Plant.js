import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required'], trim: true, },
        nickname: { type: String },
        species: { type: String, required: [true, 'Species is required'], trim: true, },
        location: { type: String },
        watering_frequency: { type: Number, required: [true, 'Watering Frequency is required'], trim: true, },
        last_watered: { type: String, required: [true, 'Last Watered is required'], trim: true },
        date_added: { type: String },
    },
    { timestamps: true, versionKey: false }
);

plantSchema.set('toJSON', 'toObject', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});
export default mongoose.model('Plant', plantSchema);