import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../../Redux/blogs/blog.action";
import { toast } from "react-toastify";

// const API_KEY = "50938726ed5b1dc3e275abc4759bf1bc";

function UpdateBlog({ placeholder }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { blogId } = useParams();
  const config = useMemo(
    () => ({
      readonly: false,
    //   placeholder: placeholder || "Start typing...",
      height: "500px",
      // uploader: {
      //   // insertImageAsBase64URI: true,
      //   url: "https://api.imgbb.com/1/upload",
      //   format: "json",
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${API_KEY}`,
      //   },
      //   isSuccess: function (resp) {
      //     return resp.success === true;
      //   },
      //   getMsg: function (resp) {
      //     return resp.message;
      //   },
      //   process: function (resp) {
      //     // Customize the HTML output for the uploaded image
      //     return `<img style="float:right; margin: 10px;width:300px; height: 200px;" src="${resp.data.url}" alt="${resp.data.name}">`;
      //   },
      //   files: "files[0]",
      // },
    }),
    [placeholder]
  );
  const handleChangeTitle = (e) =>{
    setTitle(e.target.value);
  }
  const handleChangeCategory = (e) =>{
    setCategory(e.target.value);
  }

  const getSingleBlog = async () =>{
    try{
       const response =  await axios.get(`http://localhost:8000/api/v1/blog/allBlogs/${blogId}`,{withCredentials: true});
       console.log(response);
       setContent(response?.data?.description);
       setTitle(response?.data?.title);
       setCategory(response?.data?.category)
    } catch(err){
        console.log(err)
    }
  }
  const handlePublish = async() =>{
    const data = {
      title: title,
      description: content,
      category: category
    }
   try{
    // await axios.patch(`http://localhost:8000/api/v1/blog/update/${blogId}`, data, {withCredentials: true});
    const res= await updateBlog(blogId, data);
    if(res.sucess===true){
      toast.success("Blog Updated Successfully");
    }
    
   }
   catch(error){
    alert(error);
   }finally{
    navigate(`/blogs/${blogId}`)
   }
  }
  useEffect(()=>{
    getSingleBlog();
  },[]);
  return (
    <Box>
      <Stack spacing={2} sx={{ padding: "30px" }}>
        <TextField label="Enter Blog Title" sx={{width: "80%"}} value={title} onChange={(e)=>handleChangeTitle(e)}/>
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={category}
          label="Category *"
          onChange={(e)=>handleChangeCategory(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Coding"}>Coding</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
            <Button variant="contained" onClick={handlePublish}>Update Blog</Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default UpdateBlog;