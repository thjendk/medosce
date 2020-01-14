import styled from 'styled-components';

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const PageWrapper = styled.div`
  padding: 1em;
  margin: auto;
  max-width: 1200px;
  min-width: 50vw;

  @media (max-width: 400px) {
    margin: 1em 0;
  }
`;

export const QuestionText = styled.div`
  font-size: 1.3em;
  color: ${(props) => props.color};
`;
