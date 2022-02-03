import express from "express";
import cors from 'cors';
import { v4 as userId } from "uuid"


const app = express();
const port = 5000;

let courses = [
    {
        "id": userId(),
        "title": "The Complete Node.js Developer Course",
        "author": "Andrew Mead, Rob Percival",
    },
    {
        "id": userId(),
        "title": "Node.js, Express & MongoDB Dev to Deployment",
        "author": "Brad Traversy",
    },
    {
        "id": userId(),
        "title": "JavaScript: Understanding The Weird Parts",
        "author": "Anthony Alicea",
    }
];



// middle ware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors for letting the front end to access the backend
app.use(cors(
    {
        origin: "http://localhost:3000",
    }
));


// routes || endpoints
// it is the default route
app.get("/", (req, res) => {
    console.log("reached get route")
    res.send(courses);
})

app.post("/", (req, res) => {
    console.log("reached post route")
    const newCourse = req.body;
    courses.push({ ...newCourse, id: userId() });
    res.send(`the new course is ${newCourse.title}`);
})


app.delete("/:id", (req, res) => {
    console.log("reached delete route")
    const { id } = req.params;
    courses = courses.filter(course => course.id !== id);
    res.send(`the course with id ${id} is deleted`);

})


app.put("/:id", (req, res) => {
    console.log("reached put route")
    const { id } = req.params;
    const { title, author } = req.body;
    courses = courses.map(course => {
        if (course.id === id) {
            return { ...course, title, author };
        }
        return course;
    });
    res.send(`the course with id ${id} is updated`);
})

app.patch("/:id", (req, res) => {
    console.log('reached patch route')
    const { id } = req.params;
    const { title, author } = req.body;
    const specificCourse = courses.find(course => course.id === id);
    if (title) {
        specificCourse.title = title;
    }
    if (author) {
        specificCourse.author = author;
    }
    res.send(`the course with id ${id} is patched`);
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

