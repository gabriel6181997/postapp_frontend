import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Like, Post } from "../types/post";

export const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListsOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like: Like) => like.PostId)
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likePost = (postId: number) => {
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
        const newListOfPost = listOfPosts.map((post) => {
          if (post.id === postId) {
            if (response.data.liked) {
              
              return {
                ...post,
                likes: post.Likes.length + 1,
              };
            } else {
              return {
                ...post,
                likes: post.Likes.length - 1,
              };
            }
          } else {
            return post;
          }
        });
        setListsOfPosts(newListOfPost);

        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
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
              <div className="username">
                <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  className={
                    likedPosts.includes(post.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => {
                    likePost(post.id);
                  }}
                />
                <label>{post.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
