import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ProjectDetailsContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
`;

const ProjectDetailsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ProjectDetailsDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ProjectDetailsImage = styled.img`
  max-width: 100%;
  margin-bottom: 1rem;
`;

const ProjectDetailsVideo = styled.iframe`
  width: 100%;
  height: 400px;
  margin-bottom: 1rem;
`;

const ProjectDetailsLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  margin-right: 1rem;
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

useEffect(() => {
  async function fetchProjectDetails() {
    try {
      const response = await axios.get(`https://port-back-sbs1.onrender.com/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  }

  fetchProjectDetails();
}, [id]);


  return (
    <ProjectDetailsContainer>
      {project ? (
        <>
          <ProjectDetailsTitle>{project.title}</ProjectDetailsTitle>
          <ProjectDetailsDescription>{project.description}</ProjectDetailsDescription>
          {project.additionalDetails && (
            <p>Additional project details: {project.additionalDetails}</p>
          )}

          {/* Display images */}
          {project.images && project.images.map((image, index) => (
            <ProjectDetailsImage key={index} src={image} alt={`Image ${index}`} />
          ))}

          {/* Display video */}
          {project.video && (
            <ProjectDetailsVideo
              src={project.video}
              title={`Video for ${project.title}`}
              frameborder="0"
              allowfullscreen
            />
          )}

          {/* Display code snippets */}
          {project.codeSnippets && project.codeSnippets.map((snippet, index) => (
            <pre key={index}>
              <code>{snippet}</code>
            </pre>
          ))}

          {/* Display links */}
          {project.links && project.links.map((link, index) => (
            <ProjectDetailsLink key={index} href={link.url} target="_blank">
              {link.label}
            </ProjectDetailsLink>
          ))}
        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </ProjectDetailsContainer>
  );
};

export default ProjectDetails;