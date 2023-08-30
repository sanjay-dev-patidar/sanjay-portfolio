import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BlogsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  max-height: 500vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const BlogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #2196f3;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
`;

const BlogCard = styled.div`
  width: 100%;
  max-width: 1500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f7f7f7;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

`;

const BlogTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const BlogContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
  img {
    max-width: 100%;
    margin-bottom: 1rem;
  }
  a {
    color: #2196f3;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://port-back-sbs1.onrender.com/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }
      await axios.post('https://port-back-sbs1.onrender.com/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setContent('');
      setFile(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  return (
    <BlogsContainer>
       
      <Title>My Blogs</Title>
      <BlogForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Write your blog content..."
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <FileInput type="file" onChange={(e) => setFile(e.target.files[0])} />
        <SubmitButton type="submit">Post Blog</SubmitButton>
      </BlogForm>
      {blogs.map((blog) => (
        <BlogCard key={blog._id}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogContent>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* Display images */}
            {Array.isArray(blog.imageUrl) &&
              blog.imageUrl.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
              ))}

            {/* Display PDF link */}
            {blog.pdfUrl && (
              <div>
                <a href={blog.pdfUrl} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </div>
            )}

            {/* Display video */}
            {blog.videoUrl && (
              <div>
                <iframe
                  width="100%"
                  height="315"
                  src={blog.videoUrl}
                  title={`Video ${index}`}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </BlogContent>
        </BlogCard>
      ))}
        
    </BlogsContainer>
  );
};

export default Blogs;
