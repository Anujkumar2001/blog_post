import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postbase_url } from "../url";
import axios from "axios";
import "../style/postDetails.css";
import Input from "../component/Input";
import GetComments from "../component/getComments";
import CreateComment from "../component/CreateComment";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { commentbase_url } from "../url";
function PostDetails() {
  const [userDetails, setUserDetails] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const lsAccessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    axios
      .get(`${postbase_url}/${id}`)
      .then((data) => {
        setUserDetails(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { thumbnail, title, post } = userDetails;
  const handleCommnet = (e) => {
    setCommentInput(e.target.value);
  };
  //   comment data get ------
  const getCommentFun = async () => {
    let res = await axios.get(`${commentbase_url}/${id}`);
    setComments(res.data.data);
  };
  useEffect(() => {
    getCommentFun();
  }, []);

  const fetchComment = () => {
    getCommentFun();
  };
  return (
    <div className="userDetailsContainer">
      <div className="userDetails">
        <img src={thumbnail} alt="" />
        <div className="aboutPostDetails">
          <h3>{title}</h3>
          <p>{post}</p>
        </div>
      </div>
      <div className="commentContainer">
        <h3>comments</h3>
        <div className="commentContent">
          {(accessToken || lsAccessToken) && (
            <CreateComment
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              fetchComment={fetchComment}
            >
              <Input
                placeholder="comments..."
                onchange={handleCommnet}
                label="write comment"
                className="comment"
              />
            </CreateComment>
          )}
          <GetComments comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
