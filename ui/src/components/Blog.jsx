import React, { useEffect, useState} from "react";
import axios from 'axios';


let uri = 'http://localhost:3001/';

function Blog() {
  const [blogList, setBlogList] = useState([]);

  const fetchBlogs = () => {
    axios.get(`${uri}blogposts`).then((res) => {
      console.log(res);
      setBlogList(res.data);
    });
  };

  useEffect(()=>{
    fetchBlogs();
  }, []);


  return (
    <div className="blog">
    {blogList.map((post) => {
      let date =  new Date(post.posted_at);
      return(
        <>
        <div class="container border rounded my-4">
          <h1 align="center"><b>{post.title}</b></h1>
          <h5 align="center">Author: {post.author}</h5>
          <h5 align="center">Date: {date.getMonth()+1 + '-' + date.getDate() +'-' + date.getFullYear()}</h5>
          <p>{post.description}</p>
        </div>
        </>
      )
    })}
    </div>
  );
}

export default Blog;