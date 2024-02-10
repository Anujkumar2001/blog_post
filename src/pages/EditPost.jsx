import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import "../style/createPost.css";
import axios from "axios";
import { categorybase_url, postbase_url } from "../url";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../style/editPost.css";

function EditPost() {
  const { accessToken } = useContext(AuthContext);
  const lsAccessToken = localStorage.getItem("accessToken");
  const [category, setCategory] = useState([]);
  const formData = new FormData();
  const [loading, setLoading] = useState("post");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({
    title: "",
    slug: "",
    post: "",
    category: "",
    thumbnail: null,
  });
  // category fetch -----------------
  useEffect(() => {
    userBlogPost();
    getcategory();
  }, []);
  const getcategory = async () => {
    try {
      let res = await axios.get(categorybase_url, {
        headers: {
          Authorization: `Bearer ${accessToken || lsAccessToken}`,
        },
      });

      setCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------

  //   getting user blog post ------------
  const userBlogPost = async () => {
    try {
      const res = await axios.get(`${postbase_url}/${id}`);
      if (res.status == 200) {
        const { title, slug, category, thumbnail, post } = res.data.data;
        setPostDetails((postDetails) => ({
          ...postDetails,
          title: title,
          post: post,
          slug: slug,
          category: category,
          thumbnail: thumbnail,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------

  // edit post data to api -----------------
  const createNewPost = async () => {
    try {
      const res = await axios.put(`${postbase_url}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken || lsAccessToken}`,
        },
      });
      if (res.status === 200) {
        navigate("/post");
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  // -------------------

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formData.append("title", postDetails.title);
    formData.append("slug", postDetails.slug);
    formData.append("post", postDetails.post);
    formData.append("thumbnail", postDetails.thumbnail);
    formData.append("category", postDetails.category);
    createNewPost();
    setLoading("Loading...");
    setLoader(true);
  };
  const handleChange = (e) => {
    if (e.target.name == "title") {
      setPostDetails({
        ...postDetails,
        [e.target.name]: e.target.value,
        slug: e.target.value.replace(/\s/g, "-"),
      });
    } else {
      setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
    }
  };
  const handleChangeImg = (e) => {
    setPostDetails({ ...postDetails, thumbnail: e.target.files[0] });
  };

  return (
    <div className="createPostContainer">
      <h2>Edit Your Post</h2>
      <div className="editPostThumbnail">
        <img src={postDetails.thumbnail} alt="" />
      </div>
      <form className="createPostContent" onSubmit={handleFormSubmit}>
        <Input
          type="text"
          Id={"title"}
          name="title"
          placeholder="title"
          label={"title:"}
          onchange={handleChange}
          value={postDetails.title}
          required
        />
        <Input
          type="text"
          Id={"slug"}
          placeholder="slug"
          label={"slug:"}
          name="slug"
          onchange={handleChange}
          value={postDetails.slug}
          disabled
          required
        />
        <span className="postTextArea">
          <label htmlFor="myTextarea">write post</label>
          <textarea
            id="myTextarea"
            name="post"
            rows="10"
            cols="50"
            onChange={handleChange}
            value={postDetails.post}
            required
          ></textarea>
        </span>
        <label htmlFor="category">select category</label>
        <select
          name="category"
          id="category"
          value={postDetails.category}
          onChange={handleChange}
          required
        >
          <option>none</option>
          {category?.map((data) => {
            return (
              <option key={data._id} value={data._id} name={data.name}>
                {data.name}
              </option>
            );
          })}
        </select>

        <Input
          type="file"
          Id={"thumbnail"}
          label={"thumbnail:"}
          onchange={handleChangeImg}
          required
        />
        <span className="createPostBtn">
          <button className="button-3">{loading}</button>
          {loader && <span className="loader"></span>}
        </span>
      </form>
    </div>
  );
}

export default EditPost;
