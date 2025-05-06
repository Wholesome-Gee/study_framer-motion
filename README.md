# Framer-motion으로 animation 구현하기

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #8 ANIMATIONS
📍 비고 :  
📍 라이브러리 :  

react + typescript : npx create-react-app checklist --template typescript  
styled-components : npm i styled-components, npm i --save-dev @types/styled-components  
framer-motion : npm i motion

🚫 미사용 라이브러리  
recoil (React v18 이하에서 구동) : npm i recoil  
react-hook-form : npm i react-hook-form  
react-icons : npm i react-icons --save  
react-beautiful-dnd : npm i react-beautiful-dnd --legacy-peer-deps, npm i --save-dev   @types/react-beautiful-dnd --legacy-peer-deps  
react v18 다운그레이드 : npm i react@18 react-dom@18    
gh-pages : npm i gh-pages    
react-router-dom : npm i react-router-dom, npm i --save-dev @types/react-router-dom  
react-query (React v18 이하에서 구동) : npm i react-query   

---

### #8.1

**📗framer-motion으로 div에 animation을 적용하려면 \<motion.div>**

```jsx
import styled from "styled-components";
import { motion } from "motion/react"

// div를 motion요소로 만들기 <motion.div>
export default function App() {
  return (
    <motion.div style={{width:120, height:120, backgroundColor:"white"}}>
      <span>motion.div</span>
    </motion.div>
  )
}
```

---

### #8.2

**📗style-components에 framer-motion 적용하기**

```jsx
import styled from "styled-components";
import { motion } from "motion/react"

// styled-components를 motion요소로 만들기 styled(motion.div)
const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: teal;
`;

// initial은 초기값, animate는 적용값, transition은 type(spring,tween), delay, duration 등등.. 문서참고
export default function App() {
  return <Box initial={{scale:0.2}} animate={{scale:1, rotateZ:360}} transition={{type:'spring', delay:0.5}}/>
}
```

---

### #8.3

**📗framer-motion의 Variants 기능으로 애니메이션 코드를 조금 더 깔끔하게 정리하기**

```jsx
import styled from "styled-components";
import { motion } from "motion/react"

const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: teal;
`;

// variants 정의
const myVariant = {
  start: { scale:0.2 },
  end: {
    scale:1,
    rotateZ:360,
    transition:{
      type:'spring',
      delay:0.5
    }
  },
}

// variants={사용할 variants} / initial={variants 초기값이 정의된 key} / animate={variants의 적용값이 정의된 key}
export default function App() {
  return <Box variants={myVariant} initial="start" animate="end"/>
}
```

---

### #8.4

**📗delayChild, staggerChild로 자식 Component에게 순차적인 애니메이션 딜레이 걸기**
```jsx
import styled from "styled-components";
import { motion } from "motion/react"

const Father = styled(motion.div)` 
  width: 120px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  background-color: teal;
`;
const Child = styled(motion.div)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  place-self: center;
  background-color: tomato;
`
const fatherVariant = {
  start: { 
    opacity: 0,
    scale: 0.5
  },
  end: {
    opacity: 1,
    scale: 1,
    transition:{
      type: 'spring',
      bounce: 0.5,  // 'spring' 전용
      delay: 0.5,
      duration: 2,
      delayChildren: 2,  // 자식요소의 애니메이션에 딜레이 설정
      staggerChildren: 0.4  // 자식요소에게 순차적으로 딜레이 부여 (stargger = 시차를 두다)
    },
  }
}
const childVariant = {
  start: {
    opacity: 0,
    y: 20,
  },
  end: {
    opacity: 1,
    y: 0,
  }
}

// 부모 motion요소에 initial과 animate는 자식 motion요소에게 전달된다.
export default function App() {
  return (
    <Father variants={fatherVariant} initial="start" animate="end">
      <Child variants={childVariant}/> 
      <Child variants={childVariant}/>
      <Child variants={childVariant}/>
      <Child variants={childVariant}/>
    </Father>
  );
}
```

---

### #8.5~8.6
**📗framer-motion의 whileHover, whileTap 등 while기능으로 이벤트핸들러에 따른 애니메이션 적용하기**
```jsx
import styled from "styled-components";
import { motion } from "motion/react"

const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: teal;
`;

const whileVariants = {
  hover: { scale:1.5, rotateZ:90, transition:{ duration: 0.4 }},
  tap: { scale:1, borderRadius:"50%", transition:{ duration: 0.4 }},
}

// motion 요소의 이벤트리스너를 활용하여 animation 적용하기 (WhileHover, WhileTap 등)
export default function App() {
  return (
    <Box 
      variants={whileVariants} 
      whileHover="hover" 
      whileTap="tap" 
      onHoverStart={() => console.log('hover started!')}
    />
  );
}
```

**📗framer-motion 요소를 드래그하기 및 드래그 가능범위 만들기**
```jsx
import styled from "styled-components";
import { motion } from "motion/react"
import { useRef } from "react";

const Container = styled(motion.div)`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
`
const Box = styled(motion.div)` 
  width: 100px;
  height: 100px;
  background-color: rgb(0,0,0);
`;

const dragVariant = {
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 1 } },
}

// drag = motion요소를 드래그가능한 요소로 만들어준다. (크롬에서 사용 시 error가 발생함.)
// dragSnapToOrigin = 드래그가 끝나면 motion요소를 원위치로 돌려놓는다.
// dragConstraints = 드래그 가능 범위를 설정한다. 좌표로 직접 설정할 수 있지만, 보통은 html 요소의 내부로 지정한다.
// dragConstraints = html요소를 지정하기 위해선 useRef와 ref를 통해 해당 html요소에 접근이 가능하도록 한다.
// dragElastic = 드래그 저항력을 설정한다. (0~1)
export default function App() {
  const container = useRef(null) 
  return (
    <>
      <Container ref={container}>
        <Box drag dragSnapToOrigin dragConstraints={container} dragElastic={0.5}  variants={dragVariant} whileDrag="drag"/>
      </Container>

      <Container ref={container}>
        <Box drag dragSnapToOrigin dragConstraints={{top:-50, bottom:50, left:-50, right:50 }} dragElastic={1} variants={dragVariant} whileDrag="drag"/>
      </Container>
    </>
  );
}
```
---

### #8.7

**📗useMotionValue를 사용하여 애니메이션상태를 추적하거나 제어하기**
```jsx
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react"

const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: teal;
`;
// useMotionValue = motion요소의 애니메이션 상태를 추적하고 제어한다. motionValue값이 변해도 재렌더링 X 
// useMotionValueEvent(motionValueX,"change",(current)=> console.log(current))는 motionValueX가 change 될 때마다 콜백함수((current)=>console.log(current))를 실행한다.
// motionValueX를 Box style의 x에 적용함으로써 motionValueX는 Box의 x animation 상태를 추적하고 컨트롤 할 수 있음
// motionValueX.set(300) 이런식으로 motionValue값을 컨트롤 가능
export default function App() {
  const motionValueX = useMotionValue(0)
  useMotionValueEvent(motionValueX,"change",(current)=>console.log(current.get())) // motionValue x값을 받아오는 방법  #8.7
  return (
    <>
      <Box style={{ x: motionValueX }}/>
      <button onClick={()=>motionValueX.set(300)}>click</button>
    </>
  );
}
```

---

### #8.8

**📗useTransform을 사용하여 motionValue의 변화에 따른 애니메이션 적용하기**
```jsx
import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react"

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: white;
`;

// useTransform(motionValue,조건값,반환값)  => motionValue가 변하면? 그에따른 스타일의 변화를 일으키고 싶을때 사용
// Component에 drag를 붙혀서 Uncaught Error 뜨면? index.tsx에서 React strict mode를 제거하라
export default function App() {
  const motionValueX = useMotionValue(0)
  const scaleTransform = useTransform(motionValueX,[-800,0,800],[0.1,1,2])
  const backgroundTransform = useTransform(
    motionValueX, [-800, 800], ["linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))", "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))"]
  ) // #8.9
  useMotionValueEvent(motionValueX,"change",(current)=>{console.log(current)})
  return (
    <Container style={{background:backgroundTransform}}>
      <Box drag="x" style={{x:motionValueX, scale:scaleTransform}}/>
    </Container>
  )
}
```

---

### #8.9

**📗motion의 useScroll을 사용하여 scroll값에 따른 애니메이션 적용하기**
```jsx
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
```

---

### #8.10

**📗svg에 애니메이션 적용하기 (사이트 첫 입장화면 만들때 좋음)**
```jsx
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

```

---

### #8.11

**📗\<AnimatePresence>를 사용하여 사라지는 motion요소에 애니메이트하기**
```jsx
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
```

---

### #8.12

**📗\<AnimatePresence>를 사용하여 슬라이드 구현하기 part.1**
- next버튼만 구현
```jsx
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
```