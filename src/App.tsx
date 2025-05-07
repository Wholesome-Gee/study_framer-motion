import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: teal;
`
const Grid = styled.div`
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`
// grid-column: span 2 는 해당 요소가 2칸을 차지한다는 뜻
const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255,255,255,1);
`
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

const overlayVariant = {
  start:{ backgroundColor: 'rgba(0,0,0,0)' },
  end:{  backgroundColor: 'rgba(0,0,0,0.5)' },
  exit:{  backgroundColor: 'rgba(0,0,0,0)' }
}
export default function App () {
  const [click, setClick] = useState(false)
  function changeClick(){
    setClick(click=>!click)
  }
  return (
    <Wrapper onClick={changeClick}>
      <Grid>
        <Box layoutId="1"></Box>
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Grid>
      <AnimatePresence>
        {click ? 
          <Overlay variants={overlayVariant} initial="start" animate="end" exit="exit" transition={{duration:0.5}}>
            <Box layout layoutId="1" style={{width:800, height:400}}></Box>
          </Overlay> : 
          null
        }
      </AnimatePresence>
    </Wrapper>
  )
}