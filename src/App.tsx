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
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 200px;
  font-size: 28px;
`;

const boxVariant = {
  start: {
    opacity: 0,
    scale: 0,
    x: 400
  },
  end: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: -400,
    transition: {
      duration: 0.5
    }
  }
}

export default function App() {
  const [page, setPage] = useState(1)
  function nextPage() {
    setPage((prev)=>(prev===10 ? 10 : prev+1))
  }
  return (
    <Container>
      <AnimatePresence>
        {
          [1,2,3,4,5,6,7,8,9,10].map((item)=> 
            item===page ? 
              <Box variants={boxVariant} initial="start" animate="end" exit="exit" key={item}>{item}</Box> : 
              null
          )
        }
      </AnimatePresence>
      <button onClick={nextPage}>next Page</button>
    </Container>
  )
}