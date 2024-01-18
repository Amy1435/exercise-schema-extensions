import mongoose from "mongoose";
import dayjs from "dayjs";
const { Schema, SchemaTypes, model } = mongoose;

const musicianSchema = new Schema({
    albums: {
        type: [SchemaTypes.ObjectId],
    },
    firstName: {
        type: String,
        maxLength: 10,
    },
    lastName: {
        type: String,
        maxLength: 10,
    },
    artName: {
        type: String,
        maxLength: 10,
    },
    birthDate: {
        type: Date,
    },
});

musicianSchema
    .virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })
    .set(function (value) {
        const section = value.split(" ");
        this.firstName = section[0];
        this.lastName = section[1];
        this.save();
    });

musicianSchema.virtual("age").get(function () {
    const now = dayjs();
    const birthDate = dayjs(this.birthDate);
    return now.diff(birthDate, "years");
});
const musicianModel = model("Musician", musicianSchema);

export default musicianModel;
