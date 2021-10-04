import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListsOfPosts(response.data);
    });
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        {
          PostId: postId,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setListsOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div className="App">
      {listOfPosts.map((post, key) => {
        return (
          <div className="post" key={key}>
            <div className="title">{post.title}</div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              {post.postText}
            </div>
            <div className="footer">
              {post.username}
              <button
                onClick={() => {
                  likePost(post.id);
                }}
              >
                Like
              </button>
              <label>{post.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
