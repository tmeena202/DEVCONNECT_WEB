import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-neutral-700 mb-3">
          // connections
        </p>
        <p className="font-mono text-sm text-neutral-600">no connections found</p>
      </div>
    );

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] py-14 px-6"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="mb-10">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sky-400 mb-2">
            // connections
          </p>
          <h1 className="text-2xl font-medium tracking-tight text-neutral-100">
            Your Connections
          </h1>
          <p className="mt-1 text-[0.78rem] text-neutral-500 font-light">
            {connections.length} connection{connections.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

            return (
              <div
                key={_id}
                className="flex items-center gap-5 px-5 py-4 bg-[#111111] border border-[#1f1f1f] rounded-sm hover:border-[#2e2e2e] transition-colors duration-150"
              >
                {/* Avatar */}
                <img
                  alt={`${firstName} ${lastName}`}
                  src={photoUrl}
                  className="w-12 h-12 rounded-sm object-cover border border-[#2e2e2e] flex-shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-[0.92rem] font-medium text-neutral-100 tracking-tight">
                    {firstName} {lastName}
                  </h2>

                  {(age || gender) && (
                    <p className="font-mono text-[0.63rem] tracking-[0.1em] uppercase text-neutral-600 mt-0.5">
                      {[age && `${age} yrs`, gender].filter(Boolean).join(" · ")}
                    </p>
                  )}

                  {about && (
                    <p className="text-[0.75rem] text-neutral-600 mt-1 leading-relaxed line-clamp-1 font-light">
                      {about}
                    </p>
                  )}
                </div>

                {/* Chat button */}
                <Link to={"/chat/" + _id} className="flex-shrink-0">
                  <button className="font-mono text-[0.68rem] tracking-[0.1em] uppercase font-semibold px-4 py-2 rounded-sm bg-sky-400 text-black hover:bg-sky-300 active:scale-[0.98] transition-all duration-150 cursor-pointer">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;