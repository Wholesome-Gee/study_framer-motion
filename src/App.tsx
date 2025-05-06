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
  start: (isReverseSlide:boolean)=>{  // custom={isReverseSlide}가 boxVariant의 key들에게 isReverseSlide라는 prop을 전달해줌
    return {
      opacity: 0,
      scale: 0,
      x: isReverseSlide ? -400 : 400
    }
  },
  end: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: (isReverseSlide:boolean)=>{  // custom={isReverseSlide}가 boxVariant의 key들에게 isReverseSlide라는 prop을 전달해줌
    return {
      opacity: 0,
      scale: 0,
      x: isReverseSlide ? 400 : -400,
      transition: {
        duration: 0.5
      }
    }
  }
}

export default function App() {
  const [page, setPage] = useState(1)
  const [isReverseSlide, setIsReverseSlide] = useState(false)
  function nextPage() {
    setIsReverseSlide(false)
    setPage((prev)=>(prev===10 ? 10 : prev+1))
  }
  function prevPage() {
    setIsReverseSlide(true)
    setPage((prev)=>(prev===1 ? 1 : prev-1))
  }

// ReactJS는 Component에 key가 있다면 해당 Component를 고유한 Component로 인식한다. 
// 같은 Component에서 key의 값이 변하면? ReactJS는 Component요소가 교체되었다고 인식하고 Component를 재렌더링한다. 
// 이 점을 활용하여 슬라이드 박스를 만들 수 있다!
// mode="wait"는 animate 작업이 끝난 후 exit 작업을 진행시켜준다. (순차적)
// custom은 variants의 key에게 prop을 전달해준다. (custom 사용 시, 요소와 요소를 감싸고 있는 AnimatePresence Component에도 custom을 적용해야한다.)
  return (
    <Container>
      <AnimatePresence custom={isReverseSlide} mode="wait">
        {page ? 
          <Box 
            custom={isReverseSlide}
            variants={boxVariant} 
            initial="start" 
            animate="end" 
            exit="exit" 
            key={page}
          >
            {page}
          </Box> :
          null 
        }
      </AnimatePresence>
      <button onClick={nextPage}>next Page</button>
      <button onClick={prevPage}>previous Page</button>
    </Container>
  )
}