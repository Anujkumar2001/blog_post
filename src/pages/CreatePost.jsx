import React, { useEffect, useState } from "react";
import Input from "../component/Input";
import "../style/createPost.css";
import axios from "axios";
import { categorybase_url, postbase_url } from "../url";
import { useContext } from "react";
import { AuthContext } from "../contextProvider/myContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const { accessToken } = useContext(AuthContext);
  const lsAccessToken = localStorage.getItem("accessToken");
  const [catogery, setCategory] = useState([]);
  const formData = new FormData();
  const [loading, setLoading] = useState("post");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [postDetails, setPostDetails] = useState({
    title: "",
    slug: "",
    post: "",
    catogery: "",
    thumbnail: null,
  });
  // catogery fetch -----------------
  useEffect(() => {
    getCatogery();
  }, []);
  const getCatogery = async () => {
    try {
      let res = await axios.get(categorybase_url, {
        headers: {
          Authorization: `Bearer ${accessToken || lsAccessToken}`,
        },
      });
      setCategory(res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------------

  // sending post data to api -----------------
  const createNewPost = async () => {
    setLoader(true);
    try {
      let res = await axios.post(postbase_url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken || lsAccessToken}`,
        },
      });
      if (res.status == 201) {
        navigate("/");
        setLoading("post");
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading("post");
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
    formData.append("category", postDetails.catogery);
    createNewPost();
    console.log(postDetails);
    setLoading("Loading...");
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
  console.log(catogery);
  return (
    <div className="createPostContainer">
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
            onChange={handleChange}
            value={postDetails.post}
            required
          ></textarea>
        </span>
        <label htmlFor="catogery">select catogery</label>
        <select
          name="catogery"
          id="catogery"
          value={postDetails.catogery}
          onChange={handleChange}
          required
        >
          <option>none</option>
          {catogery?.map((data) => {
            console.log(catogery, "catofery");
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
          <button className="button-3">
            Create-post {loader && "loading..."}
          </button>
        </span>
      </form>
    </div>
  );
}

export default CreatePost;
