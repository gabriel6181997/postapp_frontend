import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
  const [listofPosts, setListsOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listofPosts.map((post, key) => {
        return (
          <div className="post" key={key}>
            <div className="title">{post.title}</div>
            <div className="body">{post.postText}</div>
            <div className="footer">{post.username}</div>
          </div>
        );
      })}
    </div>
  );
};
