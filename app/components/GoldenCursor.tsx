"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GoldenCursor() {

const [pos,setPos] = useState({x:0,y:0});

useEffect(()=>{

const move = (e:MouseEvent)=>{
setPos({x:e.clientX,y:e.clientY});
};

window.addEventListener("mousemove",move);

return ()=>window.removeEventListener("mousemove",move);

},[]);

return(

<motion.div
className="fixed w-6 h-6 rounded-full pointer-events-none z-50"
animate={{x:pos.x-12,y:pos.y-12}}
transition={{type:"spring",stiffness:500,damping:30}}
style={{
background:"radial-gradient(circle,#D4AF37 0%,rgba(212,175,55,0.4) 40%,transparent 70%)",
filter:"blur(1px)"
}}
/>

);

}