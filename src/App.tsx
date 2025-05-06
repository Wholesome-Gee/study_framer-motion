import { motion } from "motion/react"
import { useState } from "react"
import styled from "styled-components"

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;
const BoxOne = styled(motion.div)<{click:boolean}>`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: ${props=>props.click ? "center" : "flex-start"};
  align-items: ${props=>props.click ? "center" : "flex-start"};
  background-color: teal;
`;
const BoxTwo = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
`;
const Circle= styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: tomato;
`

export default function App() {
  const [click, setClick] = useState(false)
  function toggleClick() {
    setClick((prev)=>!prev)
  }
// layout은 해당 요소의 layout변화에 애니메이션을 자동으로 걸어준다.
// layoutId는 똑같은 layoutId를 가진 두개 이상의 요소의 상대적 변화에 애니메이션을 걸어준다.
  return (
    <Container onClick={toggleClick}>
      <BoxOne click={click}>
        <Circle layout/>
      </BoxOne>
      <BoxTwo>
        {!click ? <Circle layoutId="1" /> : null}
      </BoxTwo>
      <BoxTwo>
        {click ? <Circle layoutId="1" style={{ scale:4 }}/> : null}
      </BoxTwo>
    </Container>
  )
}