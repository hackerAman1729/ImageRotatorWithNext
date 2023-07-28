import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';

const waveAnimation = keyframes`
  0% {
    background-position: 0 bottom;
  }
  100% {
    background-position: 1000px bottom;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(45deg, rgba(106,213,230,1) 0%, rgba(172,158,214,1) 100%);
    background-size: 200% 200%;
    z-index: -1;
    animation: ${waveAnimation} 15s linear infinite;
    transform: rotate(0deg);
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007BFF;
  color: #fff;
  margin: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Image = styled.img`
  width: 200px;
  margin: 20px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transformedUrl, setTransformedUrl] = useState('');

  const transform = async (angle, flip = false) => {
    setLoading(true);
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, angle, flip }),
    });
    const data = await response.json();
    setTransformedUrl(data.transformedUrl);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transformedUrl);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <h1>Image Transformer</h1>
        <Input
          type="text"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div>
          <h2>Anticlockwise</h2>
          <Button onClick={() => transform(-90)}>Rotate 90°</Button>
          <Button onClick={() => transform(-180)}>Rotate 180°</Button>
          <Button onClick={() => transform(-270)}>Rotate 270°</Button>
        </div>
        <div>
          <h2>Clockwise</h2>
          <Button onClick={() => transform(90)}>Rotate 90°</Button>
          <Button onClick={() => transform(180)}>Rotate 180°</Button>
          <Button onClick={() => transform(270)}>Rotate 270°</Button>
        </div>
        <div>
          <h2>Flip</h2>
          <Button onClick={() => transform(0, true)}>Flip</Button>
        </div>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
        {loading && <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif" />}
        {transformedUrl && (
          <div>
            <Image src={transformedUrl} />
            <Input type="text" value={transformedUrl} readOnly />
            <Button onClick={() => window.open(transformedUrl)}>Open in new tab</Button>
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        )}
      </Container>
    </>
  );
}


