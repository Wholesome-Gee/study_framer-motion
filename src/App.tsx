import styled from "styled-components";
import { motion, useMotionValue } from "motion/react"
import { useEffect, useRef } from "react";

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
const DragBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
`
const BiggerBox = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`
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
const hoverAndTapVariant = {
  hover: { scale:1.5, rotateZ:90 },
  tap: { scale:1, borderRadius:70 },
}
const dragVariant = {
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 1 } },
}

export default function App() {
  const biggerBox = useRef(null)
  const x = useMotionValue(0)
  // useMotionValue는 framer-motion 요소의 애니메이션 상태를 추적하고 제어한다. 허나, x값이 변한다해서 재렌더링이 일어나진 않음. 기본값은 0   #8.7
  useEffect(()=>{
    x.onChange(()=>console.log(x.get())) // motionValue x값을 받아오는 방법  #8.8
  },[x])
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
      <Box variants={hoverAndTapVariant} whileHover="hover" whileTap="tap" onHoverStart={() => console.log('hover started!')}/>
      {/* <BiggerBox ref={biggerBox}>
        <Box drag dragSnapToOrigin dragElastic={0.5} dragConstraints={biggerBox} variants={dragVariant} whileDrag="drag"/>
        <Box drag dragConstraints={{top:-50, bottom:50, left:-50, right:50 }} variants={dragVariant} whileDrag="drag"/>
      </BiggerBox> */}
      <DragBox style={{x}} drag="x" dragSnapToOrigin></DragBox>
      <button onClick={()=>x.set(300)}>click</button>
    </Wrapper>
  );
}

/*
104. div에 애니메이션 적용시킨다면 <motion.div> 라고 작성해야함  #8.1
105. framer-motion으로 애니메이션 적용시키는법 : initial={{초기값}} animate={{변화값}} transition={{여러가지 애니메이션 옵션(문서확인)}}  #8.2
    - https://motion.dev/docs/react-transitions#duration
106. framer-motion의 variants 기능을 활용하여 코드를 더욱 간단히 만들기  #8.3
107~108. variants가 적용된 component는 자식 component에게도 자동으로 initial과 animate가 전해지게 된다. 고로 Circle에는 initial, animate가 생략 가능하다.  #8.4
113. WhileHover, WhileTap 등 이벤트리스너를 활용해서 animation을 걸 수 있다.  #8.5
114. BiggerBox를 dragConstraints로 사용하기 위해 ref를 지정  #8.6
115. drag를 붙히면 drag가능한 요소가 되고, whileDrag를 통해서 animation을 걸 수 있다. (하지만 drag를 붙히는 순간 에러가 발생하여 강의 issue를 생성함)  #8.5
     dragSnapToOrigin은 드래그 종료 시 원위치 복귀, dragElastic={0~1}은 0일 수록 가운데에서 당기는 힘(중력)이 강해짐  #8.6
     dragConstraints={biggerBox}는 drag가능한 범위가 biggerBox 내부임을 나타낸다. biggerBox는 useRef로 인해 ReactJS로 접근할 수 있는 DOM요소가 된다.  #8.6
116. dragConstraints(드래그 가능범위)를 직접 설정하기(비추)  #8.6
118. useMotionValue인 x를 DragBox의 style에 적용함으로써 x는 DragBox의 animation 상태를 추적하고 컨트롤 할 수 있음.  #8.8
119. x.set(300)으로 x(DragBox의 x값)을 300으로 설정하는 버튼
*/