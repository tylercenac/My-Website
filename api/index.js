const express = require('express');
const app = express();
const cors = require('cors');
const client = require("./db");


//---app express/cors---//
app.use(cors());
app.use(express.json());


  //---Client Connection to DB---//
client.connect((err) => {
    if (err) {
      console.error('Connection Error', err.stack);
    } else {
      console.log('Connected');
    }
  });


app.get("/", (req, res) => {
    res.send("You have reached the API for Tyler Cenac's Website!");
})


//  Read All Blog Posts: to access all posts from blog_posts where the most recent post is first.
app.get("/blogposts", async(req, res) => {
    try {
        const fullTable = await client.query("SELECT * FROM blog_posts ORDER BY posted_at DESC")
        res.json(fullTable.rows);
    } catch (err) {
        console.error(err.message);
    }
});



//  Post New Blog Post Requests: takes in title, author, description strings in request body 
//   and inserts values into EMPLOYEES table with SQL query.
app.post("/newpost", async(req, res) => {
    const { title, author, description } = req.body;

    const queryString = 'INSERT INTO blog_posts(title, author, description) VALUES($1, $2, $3) RETURNING *';
    const values = [title, author, description];

    try {
        const addPost = await client.query(queryString, values);
        res.json(addPost.rows[0]);
      } catch (err) {
        console.log(err.stack);
      }
});

//---Listening Port for Localhost:3001---//
app.listen(3001, () => {
 console.log("Server running on port 3001");
});