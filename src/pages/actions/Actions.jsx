import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contents/AuthProvider";

const Actions = () => {
  const [desiredVersion, setDesiredVersion] = useState("");
  const [upgradeStatus, setUpgradeStatus] = useState("");
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://knitops-backend.vercel.app/user/${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  const currentData = userData.tech.filter((tech) => tech.name == data.name);

  const handleUpgrade = async () => {
    try {
      const isUpgrade = confirm("Proceed to upgrade?");
      if (isUpgrade) {
        const response = await axios
          .put(`http://localhost:5000/upgrade/${user?.uid}`, {
            tool: data?.name,
            desiredVersion,
          })
          .then((data) => console.log(data));

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
          <h2 className="text-xl font-semibold ">
            Available Versions {data && `of ${data.name}`}:
          </h2>
          <div className="flex justify-center gap-5">
            {data.versions.map((version, id) => (
              <button
                onClick={(e) => setDesiredVersion(e.target.innerText)}
                className="btn btn-sm"
                key={id}
              >
                {version}
              </button>
            ))}
          </div>
        </div>
        <div className="my-2">
          <div>Curernt Version: {currentData.map((d) => d.version)}</div>
          <div className="mt-4">
            Desired Version: {desiredVersion ? desiredVersion : "Not selected"}
          </div>
          <br />
          <div className="text-center">
            <button onClick={handleUpgrade}>Upgrade Tool</button>
          </div>
          {upgradeStatus && <p>{upgradeStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Actions;
