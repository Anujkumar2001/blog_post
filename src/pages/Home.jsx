import React, { useEffect, useState } from "react";
import axios from "axios";
import { postbase_url } from "../url";
import Input from "../component/Input";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import "../style/home.css";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
function Home() {
  const [allPosts, setAllposts] = useState([]);
  const [filterPost, setFilterPost] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const getTotalBlogPost = () => {
    axios
      .get(postbase_url)
      .then((data) => {
        if (data.status == 200) {
          setLoader(false);
          setAllposts(data.data.data.blogLists);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  useEffect(() => {
    setLoader(true);
    getTotalBlogPost();
  }, []);
  // blog search logic----
  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value);

    let searchedBlog = allPosts.filter((el, index) => {
      if (el.title.includes(value)) {
        return el;
      }
    });
    setFilterPost(searchedBlog);
  };

  let output = inputSearch.length === 0 ? allPosts : filterPost;
  return (
    <div className="homeContainer">
      {loader && <div class="spinner"></div>}
      <div className="serachBox">
        <Input
          type="text"
          placeholder="Search...."
          onChange={handleSearch}
          value={inputSearch}
        />
        <CiSearch className="searchIcon" />
      </div>
      {!loader ? (
        output?.map((post) => {
          return (
            <div className="allPostsContainer" key={post._id}>
              <Link to={`/post-details/${post._id}`}>
                <img src={post.thumbnail} alt="thumbnail" />
              </Link>
              <span className="homePostDetails">
                {" "}
                <h4>{post.title}</h4>
                <p>{post.createdAt.split("T", 1)}</p>
                <p className="category">
                  category-{post.category.categoryCode}
                </p>
              </span>
            </div>
          );
        })
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
}

export default Home;
