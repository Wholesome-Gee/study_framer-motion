import styled from "styled-components";
import { delay, motion, scale } from 'framer-motion'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

// styled-components에 framer-motion을 적용시키는 방법  #8.2
const Box = styled(motion.div)` 
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
`;
const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  place-self: center;
  background-color: teal;
`

const rotateVariant = {
  startAnimation: {scale:0},
  endAnimation: {
    scale:1,
    rotateZ:360,
    transition:{
      type:'spring',
      delay:1.5
    }
  },
}
const scaleVariant = {
  start: {
    opacity: 0,
    scale: 0.5
  },
  end: {
    scale: 1,
    opacity: 1,
    transition:{
      type: 'spring',
      bounce: 0.5,
      delay: 0.5,
      duration: 2,
      delayChildren: 2,  // 자식요소 딜레이 설정
      staggerChildren: 0.4  // 자식요소에게 순차적으로 딜레이 부여
    },
  }
}
const circleVariant = {
  start: {
    opacity: 0,
    y: 20,
  },
  end: {
    opacity: 1,
    y: 0,
  }
}

export default function App() {
  return (
    <Wrapper>
      {/* <motion.div></motion.div> */}
      <Box initial={{scale:0}} animate={{scale:1, rotateZ:360}} transition={{type:'spring',delay:0.5}}></Box>
      <Box variants={rotateVariant} initial="startAnimation" animate="endAnimation"/>
      <Box variants={scaleVariant} initial="start" animate="end">
        <Circle variants={circleVariant}/>
        <Circle variants={circleVariant}/>
        <Circle variants={circleVariant}/>
        <Circle variants={circleVariant}/>
      </Box>
    </Wrapper>
  );
}

/*
74. div에 애니메이션 적용시킨다면 <motion.div> 라고 작성해야함  #8.1
75. framer-motion으로 애니메이션 적용시키는법 : initial={{초기값}} animate={{변화값}} transition={{여러가지 애니메이션 옵션(문서확인)}}  #8.2
    - https://motion.dev/docs/react-transitions#duration
76. framer-motion의 variants 기능을 활용하여 코드를 더욱 간단히 만들기  #8.3
77. variants가 적용된 component는 자식 component에게도 자동으로 initial과 animate가 전해지게 된다. 고로 Circle에는 initial, animate가 생략 가능하다.  #8.4
*/