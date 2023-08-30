import React from 'react';
import styled from 'styled-components';

const ResumeContainer = styled.div`
  background-color: #C9DACD;
  padding: 4rem 0;
  text-align: center;
`;

const ResumeTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ResumeSubtitle = styled.h3`
  font-size: 1.8rem;
  color: #555;
  margin-bottom: 2rem;
`;

const ResumeLink = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #4B3F16;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.4rem;
  letter-spacing: 0.5px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #558708;
    transform: translateY(-3px);
    box-shadow: 0px 4px 6px rgba(255, 0, 102, 0.3);
  }
`;

const Resume = () => {
  return (
    <ResumeContainer>
      <ResumeTitle>Explore My Resume</ResumeTitle>
      <ResumeSubtitle>Click the link below to view my resume.</ResumeSubtitle>
      <ResumeLink href="https://example.com/path-to-your-resume" target="_blank" rel="noopener noreferrer">
        View Resume
      </ResumeLink>
    </ResumeContainer>
  );
};

export default Resume;
