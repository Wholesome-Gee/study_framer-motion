import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "motion/react"
import { useEffect, useRef } from "react";
import Variants from "./Variants";

const FullScreen = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Part = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// styled-components에 framer-motion을 적용시키는 방법  #8.2
const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
`;
const BiggerBox = styled(motion.div)`
  width: 240px;
  height: 240px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
`
const Circle = styled(motion.div)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  place-self: center;
  background-color: teal;
`
const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 10px;
`

const firstVariants = {
  start: {scale:0.2},
  end: {
    scale:1,
    rotateZ:360,
    transition:{
      type:'spring',
      delay:0.5
    }
  },
}
const secondVariants = {
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
const whileVariants = {
  hover: { scale:1.5, rotateZ:90, transition:{ duration: 0.4 }},
  tap: { scale:1, borderRadius:"50%", transition:{ duration: 0.4 }},
}
const dragVariant = {
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 1 } },
}

export default function App() {
  const biggerBox = useRef(null)
  const motionValue = useMotionValue(0)
  // useMotionValue는 framer-motion 요소의 애니메이션 상태를 추적하고 제어한다. 허나, x값이 변한다해서 재렌더링이 일어나진 않음. 기본값은 0   #8.7
  const scaleTransForm = useTransform(motionValue,[-800,0,800],[0.1,1,2])
  // useTransform은 motionValue가 -800/0/800일때, 0.1/1/2 를 반환한다.
  useEffect(()=>{
    motionValue.onChange(()=>console.log(motionValue.get())) // motionValue x값을 받아오는 방법  #8.7
  },[motionValue])
  return (
    <FullScreen>
      <Part>
      {/* div에 애니메이션 적용시킨다면 <motion.div> 라고 작성해야함  #8.1 */}
        <Title>motion.div로 motion요소 만들기</Title>
        <motion.div 
          style={{width:120, height:120, backgroundColor:"white"}}
        >
          <span>motion.div</span>
        </motion.div>
      </Part>
      <Part>
      {/* motion요소로 애니메이션 적용시키는법 initial={{초기값}} animate={{변화값}} transition={{여러가지 애니메이션 옵션(문서확인)}}  #8.2 */}
        <Title>styled components로 motion요소 만들기 (styled(motion.div))</Title>
        <Box 
          initial={{scale:0.2}} 
          animate={{scale:1, rotateZ:360}} 
          transition={{type:'spring', delay:0.5}}
        />
      </Part>
      <Part>
      {/* motion의 variants 기능을 사용하여 motion요소에 애니메이션 지정하기  #8.3 */}
        <Title>motion의 variants를 사용하여 motion요소에 애니메이션 지정하기</Title>
        <Box 
          variants={firstVariants} 
          initial="start" 
          animate="end"
        />
      </Part>
      <Part>
      {/* initial과 animate의 상속, delayChild + staggerChild로 자식 motion요소에 delay걸기  #8.4 */}
        <Title>부모 motion요소가 initial='start'와 animate='end'가 있다면 자식 motion요소는 initial,animate를 생략할 수 있다.</Title>
        <Title>delayChild, staggerChild로 부모 motion요소가 자식 motion요소의 애니메이션을 control할 수 있다.</Title>
        <Box variants={secondVariants} initial="start" animate="end">
          <Circle variants={circleVariant}/>
          <Circle variants={circleVariant}/>
          <Circle variants={circleVariant}/>
          <Circle variants={circleVariant}/>
        </Box>
      </Part>
      <Part>
      {/* WhileHover, WhileTap 등 이벤트리스너를 활용해서 animation을 걸 수 있다.  #8.5 */}
        <Title>motion의 while~~을 사용하여 motion요소의 이벤트핸들러에 애니메이션 지정하기</Title>
        <Box 
          variants={whileVariants} 
          whileHover="hover" 
          whileTap="tap" 
          onHoverStart={() => console.log('hover started!')}
        />
      </Part>
      <Part>
      {/* drag는 motion요소를 draggable하게 만들어줌(크롬에서 에러발생), dragSnapToOrigin은 motion요소가 드래그 종료시 원위치로 돌아오게함, dragElastic은 드래그 저항력, whileDrag는 drag시 애니메이션을 일으킨다. */}
      {/* dragConstraints는 드래그 가능범위...biggerBox의 경우 useRef로 인해 ReactJS로 접근이 가능한 요소로 지정해줘야함. #8.5~8.6*/}
      {/* 각 Box에 drag를 붙혀주어야함. */}
        <Title>motion요소 drag 구현하기</Title>
        <BiggerBox ref={biggerBox}>
          <Box  dragSnapToOrigin dragElastic={0.5} dragConstraints={biggerBox} variants={dragVariant} whileDrag="drag"/>
        </BiggerBox>
        <BiggerBox ref={biggerBox}>
          <Box  dragSnapToOrigin dragConstraints={{top:-50, bottom:50, left:-50, right:50 }} variants={dragVariant} whileDrag="drag"/>
        </BiggerBox>
      </Part>
      <Part>
      {/* useMotionValue인 x를 Box의 style에 적용함으로써 x는 Box의 animation 상태를 추적하고 컨트롤 할 수 있음.  #8.7 */}
      {/* x.set(300)으로 x(Box의 x축 값)을 300으로 설정하는 버튼  #8.7  */}
        <Title>useMotionValue를 사용하여 motion요소의 애니메이션 상태 관리하기</Title>
        <Box style={{x:motionValue}}/>
        <button onClick={()=>motionValue.set(300)}>click</button>
      </Part>  
      <Part>
      {/* Box가 x축으로 drag되면? Box의 scale이 커지는 애니메이션 */}
      {/* drag='x'를 붙혀주어야함. */}
        <Title>useTransForm을 사용하여 motionValue의 변화에 따른 애니메이션 구현하기</Title>
        <Box  style={{x:motionValue, scale:scaleTransForm}}/>
      </Part>
    </FullScreen>
  );
}