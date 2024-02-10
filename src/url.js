let version = "v1";
console.log("REACT_APP_BASE_URL:", process.env.REACT_APP_BASE_URL);
const ApiUrl = {
  userbase_url: `${process.env.REACT_APP_BASE_URL}/api/${version}/user`,
  commentbase_url: `${process.env.REACT_APP_BASE_URL}/api/${version}/comment`,
  postbase_url: `${process.env.REACT_APP_BASE_URL}/api/${version}/blog`,
  categorybase_url: `${process.env.REACT_APP_BASE_URL}/api/${version}/category`,
  verify_mail: `${process.env.REACT_APP_BASE_URL}/api/${version}/user/verify-account`,
  resend_otp:`${process.env.REACT_APP_BASE_URL}/api/${version}/user/resend-otp`,
  user_blog_url:`${process.env.REACT_APP_BASE_URL}/api/${version}/blog/user-blog`
};

export const {
  userbase_url,
  commentbase_url,
  postbase_url,
  categorybase_url,
  verify_mail,
  resend_otp,
  user_blog_url
} = ApiUrl;
