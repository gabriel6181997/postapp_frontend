import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { ChangeEvent } from "react-router/node_modules/@types/react";
import { Param } from "../types/param";
import { PostObject } from "../types/post";
import { API_URL } from "../api/endpoint";

export const Post = () => {
  let { id } = useParams<Param>();
  const [postObject, setPostObject] = useState<PostObject>({
    UserId: 0,
    id: 0,
    title: "",
    postText: "",
    username: "",
  });
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    axios.get(`${API_URL}/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`${API_URL}/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const addComment = () => {
    axios
      .post(
        `${API_URL}/comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id: number) => {
    axios
      .delete(`${API_URL}/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== id));
      });
  };

  const deletePost = (id: number) => {
    axios
      .delete(`${API_URL}/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        history.push("/");
      });
  };

  const editPost = (option: "title" | "body") => {
    if (option === "title") {
      let newTitle = prompt("Enter new title");
      axios.put(
        `${API_URL}/posts/title`,
        { newTitle, id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (newTitle) {
        setPostObject({ ...postObject, title: newTitle });
      }
    } else {
      let newPostText = prompt("Enter new text");
      axios.put(
        `${API_URL}/posts/postText`,
        { newText: newPostText, id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (newPostText) {
        setPostObject({ ...postObject, postText: newPostText });
      }
    }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject?.username) {
                editPost("title");
              }
            }}
          >
            {postObject?.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject?.username) {
                editPost("body");
              }
            }}
          >
            {postObject?.postText}
          </div>
          <div className="footer">
            {postObject?.username}
            {authState.username === postObject?.username ? (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                Delete Post
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            onChange={handleInput}
            value={newComment}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username ? (
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
