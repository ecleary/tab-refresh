import styled from 'styled-components';

export const BackgroundImage = styled.div`
  background-image: url("${({ backgroundImageUrl }) => backgroundImageUrl}");
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  ${'' /* transition: all 1s; */}
`;
