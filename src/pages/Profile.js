import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const Profile = () => {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1>Username: {username}</h1>
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
