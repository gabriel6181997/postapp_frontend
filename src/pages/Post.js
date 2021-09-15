import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="postText">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
};
