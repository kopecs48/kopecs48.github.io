import { projects } from '../data'
import '../App.css';
// import { CodeIcon } from "@heroicons/react/solid";
import React from "react";
import {
  Link
} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
function BasicExample() {
  return (
    <div className = "wrapper">
      
    {projects.map((project, index) => (
     
      <li className = "projects text-center" key = {project.id}>
      <Card style={{ width: '40rem' , height: '40rem'}}>
      <Card.Img variant="top" src = {project.image} style={{width: '40rem', height: '25rem'}}/>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>
          {project.description}
        </Card.Text>
        
      </Card.Body>
      <Card.Footer style={{border: 'none'}}>
        {project.link.length > 1 && (
          <Button href={project.link} target ="_blank">See Project</Button>
        )}
      
      </Card.Footer>
      </Card>
    </li>
    
    ))}
    </div>
  );
}

// export default BasicExample;











// function BasicExample() {
//   return (
//     <section id="projects" className="text-gray-400 bg-gray-900 body-font">
//       <div className="container px-5 py-10 mx-auto text-center lg:px-40">
//         <div className="flex flex-col w-full mb-20">
//           <CodeIcon className="mx-auto inline-block w-10 mb-4" />
//           <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
//             Apps I've Built
//           </h1>
//           <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
//             facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam
//             fuga dolore.
//           </p>
//         </div>
//         <div className="flex flex-wrap -m-4">
//           {projects.map((project) => (
//             <a
//               href="www.google.com"
//               key={project.image}
//               className="sm:w-1/2 w-100 p-4">
//               <div className="flex relative">
//                 <img
//                   alt="gallery"
//                   className="absolute inset-0 w-full h-full object-cover object-center"
//                   src={project.image}
//                   width = "480"
//                   height= "270"
//                 />
//                 <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
//                   <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
//                     {project.description}
//                   </h2>
//                   <h1 className="title-font text-lg font-medium text-white mb-3">
//                     {project.name}
//                   </h1>
//                   <p className="leading-relaxed">{project.description}</p>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

export default BasicExample;






