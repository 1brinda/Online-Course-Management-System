const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());

// Node and BST classes

class Node {
    constructor(course) {
        this.course = course;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // Insert course into the BST
    insert(course) {
        const newNode = new Node(course);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
    }

    // Helper method to insert nodes recursively
    _insertNode(node, newNode) {
        if (newNode.course.id < node.course.id) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    // Search for a course by ID
    search(id) {
        return this._searchNode(this.root, id);
    }

    // Helper method to search nodes recursively
    _searchNode(node, id) {
        if (node === null) {
            return null; // Not found
        }
        if (id === node.course.id) {
            return node.course; // Course found
        } else if (id < node.course.id) {
            return this._searchNode(node.left, id); // Search left
        } else {
            return this._searchNode(node.right, id); // Search right
        }
    }
}

// Initialize BST for courses
const courseBST = new BST();


let courses = [
    { id: 1, name: "Mathematics", availableSlots: 15, popularity: 150 },
    { id: 2, name: "Physics", availableSlots: 12, popularity: 120 },
    { id: 3, name: "Chemistry", availableSlots: 10, popularity: 110 },
    { id: 4, name: "Biology", availableSlots: 8, popularity: 105 },
    { id: 5, name: "History", availableSlots: 20, popularity: 80 },
    { id: 6, name: "Political Science", availableSlots: 5, popularity: 70 },
    { id: 7, name: "Economics", availableSlots: 7, popularity: 95 },
    { id: 8, name: "Computer Science", availableSlots: 25, popularity: 200 },
    { id: 9, name: "Engineering Graphics", availableSlots: 18, popularity: 170 },
    { id: 10, name: "Philosophy", availableSlots: 6, popularity: 50 }
];


let enrollments = [
    { id: 1, studentName: "Alice", courseId: 1 },
    { id: 2, studentName: "Bob", courseId: 2 },
    { id: 3, studentName: "Charlie", courseId: 8 },
    { id: 4, studentName: "Daisy", courseId: 6 },
    { id: 5, studentName: "Edward", courseId: 4 },
    { id: 6, studentName: "Fiona", courseId: 8 },
    { id: 7, studentName: "George", courseId: 3 },
    { id: 8, studentName: "Hannah", courseId: 7 },
    { id: 9, studentName: "Ivy", courseId: 5 },
    { id: 10, studentName: "Jack", courseId: 9 },
    { id: 11, studentName: "Kate", courseId: 9 },
    { id: 12, studentName: "Liam", courseId: 10 },
    { id: 13, studentName: "Mona", courseId: 3 },
    { id: 14, studentName: "Nina", courseId: 1 },
    { id: 15, studentName: "Oliver", courseId: 2 }
];

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Online Student Enrollment System API!!!");
});

// Route to get all courses
app.get("/api/courses", (req, res) => {
    res.json(courses);
});


// Route to enroll a student
app.post("/api/enroll", (req, res) => {
    const { studentName, courseId } = req.body;

    // Validate input
    if (!studentName || !courseId) {
        return res.status(400).send("Student name and course ID are required.");
    }

    // Find the course by ID
    const course = courses.find((c) => c.id === courseId);

    // Check if course exists
    if (!course) {
        return res.status(404).send("Course not found.");
    }

    // Check if there are available slots
    if (course.availableSlots <= 0) {
        return res.status(400).send("No available slots for this course.");
    }

    // Create new enrollment record
    const newEnrollment = {
        id: enrollments.length + 1,
        studentName,
        courseId,
    };

    // Add new enrollment
    enrollments.push(newEnrollment);

    // Decrease available slots for the course
    course.availableSlots -= 1;

    // Send a success response
    res.send(`Student ${studentName} successfully enrolled in course ${course.name}!`);
});


// Route to get all enrollments
app.get("/api/enrollments", (req, res) => {
    res.json(enrollments);
});

// Route to sort courses by popularity
app.get("/api/courses/sort-popularity", (req, res) => {
    const sortedCourses = [...courses].sort((a, b) => b.popularity - a.popularity);
    res.json(sortedCourses);
});

// Route to search for a course by name

/*app.get("/api/courses/search", (req, res) => {
    const query = req.query.name;
    if (!query) {
        return res.status(400).send("Please provide a course name to search.");
    }
    const matchingCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
    );
    if (matchingCourses.length === 0) {
        return res.status(404).send("No courses found matching the query.");
    }
    res.json(matchingCourses);
});
*/

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
