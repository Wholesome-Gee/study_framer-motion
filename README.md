# Framer-motion으로 animation 구현하기

📍 강의 사이트 : NOMAD CORDER  
📍 강의 제목 : React JS 마스터클래스  
📍 강의 챕터 : #8 ANIMATIONS
📍 비고 :  
📍 라이브러리 :  

react + typescript : npx create-react-app checklist --template typescript  
styled-components : npm i styled-components, npm i --save-dev @types/styled-components  
framer-motion : npm i framer-motion

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
  background-color: white;
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
    scale: 1,
    opacity: 1,
    transition:{
      type: 'spring',
      bounce: 0.5,  // 'spring' 전용
      delay: 0.5,
      duration: 2,
      delayChildren: 2,  // 자식요소 딜레이 설정
      staggerChildren: 0.4  // 자식요소에게 순차적으로 딜레이 부여
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
  background-color: white;
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

const Box = styled(motion.div)` 
  width: 120px;
  height: 120px;
  background-color: rgb(0,0,0);
`;
const BiggerBox = styled(motion.div)`
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.4);
`

const dragVariant = {
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 1 } },
}

// drag = motion요소를 드래그가능한 요소로 만들어준다. (크롬에서 사용 시 error가 발생함.)
// dragSnapToOrigin = 드래그가 끝나면 motion요소를 원위치로 돌려놓는다.
// dragConstraints = 드래그 가능 범위를 설정한다. 좌표로 직접 설정할 수 있지만, 보통은 html 요소의 내부로 지정한다.
// dragConstraints = html요소를 지정하기 위해선 useRef와 ref를 통해 해당 html요소에 접근이 가능하도록 한다.
// dragElastic = 드래그 저항력을 설정한다. (0~1)
export default function App() {
  const biggerBox = useRef(null) 
  return (
    <>
      <BiggerBox ref={biggerBox}>
        <Box drag dragSnapToOrigin dragConstraints={biggerBox} dragElastic={0.5}  variants={dragVariant} whileDrag="drag"/>
      </BiggerBox>

      <BiggerBox ref={biggerBox}>
        <Box drag dragSnapToOrigin dragConstraints={{top:-50, bottom:50, left:-50, right:50 }} dragElastic={1} variants={dragVariant} whileDrag="drag"/>
      </BiggerBox>
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
  background-color: white;
`;
// useMotionValue = motion요소의 애니메이션 상태를 추적하고 제어한다. motionValue값이 변해도 재렌더링 X 
// useMotionValueEvent(motionValueX,"change",(current)=> console.log(current))는 motionValueX가 change 될 때마다 콜백함수((current)=>console.log(current))를 실행한다.
// motionValueX를 Box style의 x에 적용함으로써 motionValueX는 Box의 x animation 상태를 추적하고 컨트롤 할 수 있음
// motionValueX.set(300) 이런식으로 motionValue값을 컨트롤 가능
export default function App() {
  const motionValueX = useMotionValue(0)
  useMotionValueEvent(motionValueX,"change",(current)=>console.log(current)) // motionValue x값을 받아오는 방법  #8.7
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

// useTransform(motionValue,조건값,반환값)
export default function App() {
  const motionValueX = useMotionValue(0)
  const scaleTransform = useTransform(motionValueX,[-800,0,800],[0.1,1,2])
  const backgroundTransform = useTransform(
    motionValueX, [-800, 800], ["linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))", "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))"]
  ) // #8.9
  useMotionValueEvent(motionValueX,"change",(current)=>{console.log(motionValueX)})
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