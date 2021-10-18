import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";
import { Param } from "../types/param";
import { Post } from "../types/post";
import { API_URL } from "../api/endpoint";

export const Profile = () => {
  let { id } = useParams<Param>();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${API_URL}/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`${API_URL}/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
        {authState.username === username ? (
          <button
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            Change My Password
          </button>
        ) : null}
      </div>
      <div className="listOfPosts">
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
                  <label>{post.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
