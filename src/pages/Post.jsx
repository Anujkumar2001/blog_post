import React, { useEffect, useState } from "react";
import { user_blog_url } from "../url";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import "../style/post.css";
import { Link } from "react-router-dom";
function Post() {
  const [ownBlogPost, setOwnBlogPost] = useState([]);
  const lsAccessToken = localStorage.getItem("accessToken");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getBlogPost();
    setLoader(true);
  }, []);

  const getBlogPost = async () => {
    try {
      let res = await axios.get(user_blog_url, {
        headers: {
          Authorization: `Bearer ${lsAccessToken}`,
        },
      });
      if (res.status === 200) {
        setOwnBlogPost(res.data.data.blogLists);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="postMainContainer">
      {!loader ? (
        ownBlogPost?.map((post) => {
          return (
            <div className="postContainer" key={post._id}>
              <Link to={`edit-post/${post._id}`}>
                {" "}
                <CiEdit id="editBtn" />
              </Link>
              <div className="postDetails">
                <h4 className="postTitle">{post.title}</h4>
                <p className="uploadTime">{post.createdAt.split("T", 1)}</p>
              </div>
              <div className="postThumbnail">
                <img src={post.thumbnail} alt="" />
              </div>
            </div>
          );
        })
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
}

export default Post;

{
  /* <div>
{" "}
<span>
  <img src={post.thumbnail} alt="thumbnail" />
  <div>
    <h4>{post.title}</h4>
    <p>{post.createdAt.split("T", 1)}</p>
  </div>
</span>
<p className="category">
  category-{post.category.categoryCode}
</p>
</div> */
}
