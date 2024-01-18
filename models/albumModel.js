import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const albumSchema = new Schema({
    musician: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Musician",
    },
    duration_seconds: {
        type: Number,
    },
    title: {
        type: String,
    },
});

albumSchema
    .virtual("duration_minutes")
    .get(function () {
        const seconds = this.duration_seconds;
        const minuti = seconds / 60;
        return minuti;
    })
    .set(function (value) {
        const seconds = value * 60;
        this.duration_seconds = seconds;
    });

albumSchema.virtual("radioTitle").get(function () {
    return `${this.musician.artName} - ${this.title} (${this.duration_minutes})`;
});

const albumModel = model("Album", albumSchema);

export default albumModel;
