import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

export const Home = () => {
  const [listOfPosts, setListsOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let history = useHistory();
  const { authState } = useContext(AuthContext);

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
          setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <div className="username">{post.username}</div>
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
