import React, { useEffect, useState } from "react";
import { commentbase_url } from "../url";
import axios from "axios";
import "../style/getComment.css";
import { useParams } from "react-router-dom";
function GetComments({ ...props }) {
  const { id } = useParams();
  let comments = props.comments;
  return (
    <div className="allComment">
      {comments?.map((data) => {
        return (
          <div className="userCommentContainer">
            <div className="userComment">
              <div className="aboutCommentUser">
                {" "}
                <img src={data.user.profileImage} alt="" />
                <span>
                  {" "}
                  <h4>{data.user.firstName + data.user.lastName}</h4>
                  <p>@{data.user.username}</p>
                </span>
              </div>
              <p>{data.updatedAt.split("T", 1)}</p>
            </div>
            <p className="comment">{data.comment}</p>
          </div>
        );
      })}
    </div>
  );
}

export default GetComments;
