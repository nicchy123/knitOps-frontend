import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const Actions = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [desiredVersion, setDesiredVersion] = useState("");
  const [upgradeStatus, setUpgradeStatus] = useState("");

  const data = useLoaderData();

  const handleUpgrade = async () => {
    try {
      const isUpgrade = confirm("Procees to upgrade?");
      if (isUpgrade) {
        const response = await axios.post("/api/version/upgrade", {
          tool: selectedTool,
          desiredVersion,
        });
        setUpgradeStatus(response.data.message);
      }
    } catch (error) {
      console.error("Error upgrading tool:", error);
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center  gap-20 ">
      <div className="border p-5">
        <h1>KnitOps Tool Upgrade</h1>
        <div className="my-6 flex justify-between gap-5">
          <h2 className="text-xl font-semibold ">Available Versions { data && `of ${data.name}`}:</h2>
          <div className="flex justify-center gap-5">
            {data.versions.map((version, id)=>
            <button onClick={(e)=>setDesiredVersion(e.target.innerText)} className="btn btn-sm" key={id}>{version}</button>
            )}
            </div>

        </div>
        <div className="my-2">

          <div className="mt-4">
              Desired Version: {desiredVersion ? desiredVersion: "Not selected"}
           
          </div>
          <br />
          <div className="text-center">
          <button onClick={handleUpgrade}>
            Upgrade Tool
          </button>
          </div>
          {upgradeStatus && <p>{upgradeStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Actions;
