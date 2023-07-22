import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Check = () => {
  const [tools, setTools] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://knitops-backend.vercel.app/tools")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setTools(data);
      });
  }, []);
  if (loading) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex lg:flex-row flex-col justify-center items-center gap-5 min-h-[100vh]">
      {tools.map((tool, i) => (
        
        <div
          key={i}
          className="bg-black w-80 h-44 flex flex-col justify-center items-center rounded-md"
        >
          <h2 className="font-bold text-3xl"> {tool.name}</h2>
          <Link to={`/check/${tool._id}`}>
            <button className="btn btn-primary mt-4">Run Version Check</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Check;
