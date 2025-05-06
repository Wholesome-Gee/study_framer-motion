import { motion } from "motion/react"
import styled from "styled-components"

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Svg = styled(motion.svg)`
  width: 300px;
  height: 300px;
`

const svgVariant = {
  start:{
    fill: "rgba(0,0,0,0)",  // svg -> path는 fill을 갖고있다. fill은 svg의 색상을 나타낸다
    pathLength: 0   // svg -< path는 pathLength를 갖고있다. pathLength는 svg의 테두리가 그려진 정도를 나타낸다.
  },
  end:{
    fill: "rgba(0,0,0,1)",
    pathLength: 1,  
    transition: {
      default: {    // svgVariant의 모든 애니메이션의 transition에 기본값을 설정
        duration: 5
      },
      fill: {       // svgVariant의 특정 애니메이션(fill)에 transition을 부여
        duration: 5,
        delay: 1.7
      }
    }
  }
}

// svg는 font-awesome에서 airbnb svg를 가져옴
// path에 애니메이션을 걸기 위해 <path> -> <motion.path>로 변경
// svg는 path를 갖고있고 path는 stroke를 갖고있다. stroke는 svg의 테두리 색상을 나타낸다
// svg는 path를 갖고있고 path는 strokeWidth를 갖고있다. strokeWidth는 svg의 테두리 두께를 나타낸다
export default function App() {
  return (
    <Container>
      <Svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 448 512"
      >
        <motion.path 
          variants={svgVariant}
          initial="start"
          animate="end"
          stroke="black"
          strokeWidth="5"
          d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"/>
      </Svg>
    </Container>
  )
}