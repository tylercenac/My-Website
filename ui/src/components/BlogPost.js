import React, { useState, useEffect } from 'react';
import axios from 'axios';


function BlogPost({post}) {
    const [display, setDisplay] = useState(0);

  
    const Back = () => {
      setDisplay(0);
      renderPanel();
    };
    const BackToEditQueue = () => {
      setDisplay(1);
      renderPanel();
    };
  

    useEffect(() => {
    }, []);
  
    let date =  new Date(post.posted_at);
  
    const renderPanel = () => {
      switch ({ display }.display) {
        case 1:
          return (
              
            <div
              class="container rounded border border-dark"
              style={{
                width: '100%'
              }}
              onClick={() => {
                setDisplay(0);
              }}
            >
            <h1 align="center"><b>{post.title}</b></h1>
                <h5 align="center">Author: {post.author}</h5>
                <h5 align="center">Date: {date.getMonth()+1 + '-' + date.getDate() +'-' + date.getFullYear()}</h5>
                <p>{post.description}</p>
              <h4 align="center">Show Less</h4>
            </div>
          );
          break;

        default:
          return (
            <div
              class="container rounded border border-dark"
              style={{
                width: '100%'
              }}
              onClick={() => {
                setDisplay(1);
              }}
            >
                <h1 align="center"><b>{post.title}</b></h1>
                <h4 align="center">Show More</h4>
            </div>
          );
          break;
      }
    };
  
    return renderPanel();
  }
  
  export default BlogPost;