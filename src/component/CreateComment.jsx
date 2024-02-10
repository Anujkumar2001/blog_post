import { useEffect, useState } from "react";
import { commentbase_url } from "../url";
import axios, { Axios } from "axios";
import Button from "./Button";
import { useParams } from "react-router-dom";
import GetComments from "./getComments";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
function CreateComment({ children, ...props }) {
  const [demo, setDemo] = useState(0);
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  let lsAccessToken = localStorage.getItem("accessToken");
  let commentPost = {
    postId: id,
    comment: props.commentInput,
  };

  const handleClick = () => {
    if (commentPost.comment.length > 0) {
      axios
        .post(commentbase_url, commentPost, {
          headers: {
            Authorization: `Bearer ${accessToken || lsAccessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          setDemo(demo + 1);
          if (res.status == 201) {
            props.fetchComment();
            props.setCommentInput("")
          }
        })
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    }
  };
  return (
    <div>
      {children}
      <Button className="button-3 createCommentBtn" onClick={handleClick}>
        submit
      </Button>
    </div>
  );
}

export default CreateComment;
