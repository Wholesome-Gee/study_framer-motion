import { motion } from "motion/dist/react";
import styled from "styled-components";

const Box = styled(motion.div)` 
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  background-color: white;
`;

const rotateVariants = {
  start: {
    rotateX:0
  },
  end: {
    rotateX:90
  }
}

export default function Variants () {
  return (
    <>
    <Box variants={rotateVariants} initial="start" animate="end"/>
    {/* <Box variants={scaleVariant} initial="start" animate="end">
      <Circle variants={circleVariant}/>
      <Circle variants={circleVariant}/>
      <Circle variants={circleVariant}/>
      <Circle variants={circleVariant}/>
    </Box> */}
    </>
  )
}