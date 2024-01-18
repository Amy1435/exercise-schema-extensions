import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Musician from "./models/musicianModel.js";
import Album from "./models/albumModel.js";
dotenv.config();
const { MONGO_URI } = process.env;

const app = express();
app.use(morgan("dev"));

const run = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        // const musician = new Musician({
        //     firstName: "kate",
        //     lastName: "Gomez",
        //     artName: "KateG",
        //     birthDate: "12/05/1980",
        // });
        // await musician.save();
        // const musician = await Musician.findById("65a98f2d52feedda19ab5fba");
        // musician.fullName = "Carol Gomaz";
        // console.log(musician.age);

        // const album = new Album({
        //     musician: "65a98c8a825d7b5a917a659b",
        //     duration_seconds: 120,
        //     title: "Hello people",
        // });
        const album = await Album.findById("65a99ffb1e95f06095ae0e08").populate(
            "musician",
            ["artName"]
        );
        // await album.save();
        console.log(album.radioTitle);
    } catch (error) {
        console.log(error.message);
    }
};

run();
