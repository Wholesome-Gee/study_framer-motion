import styled from "styled-components";
import { motion, useTransform, useScroll, useMotionValueEvent } from "motion/react"

const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  position: fixed;
  top:300px;
  left: 800px;
  background-color: teal;
`;

// useScroll은 scrollX, scrollY, scrollXProgress, scrollYProgress를 반환한다. 반환한 값이 변해도 재렌더링 X
// scrollY는 0px~ 9999px로 표시되고, scrollYProgress는 0~1로 표시된다. 
export default function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollTransform = useTransform(scrollYProgress,[0,1],[0.1,3])

  useMotionValueEvent(scrollY,"change",(current)=>{console.log("scrollY: ",current)})
  useMotionValueEvent(scrollYProgress,"change",(current)=>{console.log("scrollYProgress: ",current)})
  return (
    <div style={{height:3000}}>
      <Box style={{scale:scrollTransform}}/>
    </div>
  )
}