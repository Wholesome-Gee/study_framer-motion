import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import styled from "styled-components"

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const Box = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: teal;
`

const boxVariant = {
  start: {
    opacity: 0,
    scale: 0
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 3
    }
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      duration: 3
    }
  }
}

export default function App() {
  const [showing, setShowing] = useState(false)

  function toggleShowing() {
    setShowing((prev)=>!prev)
  }
// <AnimatePresence>는 내부의 component가 사라지는걸(exit) 애니메이트해준다.
// AnimatePresence의 내부에는 삼항연산문을 사용한 조건문이 있어야한다.
// exit는 해당 요소가 사라질 때 발생하는 애니메이션
  return (
    <Container>
      <AnimatePresence>
        {showing? 
          <Box variants={boxVariant} initial="start" animate="end" exit="exit"/> : null
        }
      </AnimatePresence>
      <button onClick={toggleShowing}>{showing ? "hide" : "show"}</button>
    </Container>
  )
}