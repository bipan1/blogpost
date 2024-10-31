import { MdWavingHand } from "react-icons/md";

export default function Home() {
  return (
   <div className="container mx-auto px-4 sm:px-16 lg:px-36 p-4">
    <div className="flex mb-2">
      <MdWavingHand size={40} color="#e0ac69" className="mr-2"/>
      <span className="mt-2 text-purple-900 font-extrabold text-2xl" >I'm Bipan, Software Engineer</span>
    </div> 
    <span className="text-lg text-gray-700">
    I'm a Software Engineer with expertise in full-stack development, focusing on React, .NET, and AWS.<br/> I build scalable applications and deliver efficient solutions across both front-end and back-end systems.
    </span>
   </div>
  );
}
