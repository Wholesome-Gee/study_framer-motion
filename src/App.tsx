import styled from "styled-components";
import { motion } from 'framer-motion'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// styled-components에 framer-motion을 적용시키는 방법  #8.2
const Box = styled(motion.div)` 
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


export default function App() {
  return (
    <Wrapper>
      {/* <motion.div></motion.div> */}
      <Box initial={{scale:0}} animate={{scale:1, rotateZ:360}} transition={{type:'spring', delay:1}}></Box>
    </Wrapper>
  );
}

/*
25. div에 애니메이션 적용시킨다면delay:1iv> 라고 작성해야함  #8.1
26. framer-motion으로 애니메이션 적용시키는법 : initial={{초기값}} animate={{변화값}} transition={{여러가지 애니메이션 옵션(문서확인)}}  #8.2
  - https://motion.dev/docs/react-transitions#duration

*/