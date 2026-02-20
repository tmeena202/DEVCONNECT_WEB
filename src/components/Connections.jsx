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

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-xl">
        No Connections Found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black py-12 px-4">
      <h1 className="text-center text-4xl font-bold text-slate-100 mb-12">
        Your Connections
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 
              rounded-2xl bg-slate-800 border border-slate-700 shadow-lg
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-100">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-slate-400 text-sm mt-1">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-slate-500 mt-2 text-sm leading-relaxed line-clamp-2">
                  {about}
                </p>
              </div>

              <Link to={"/chat/" + _id}>
                <button
                  className="px-6 py-2 rounded-lg font-semibold text-white 
                  bg-teal-600 hover:bg-teal-700 transition duration-300 shadow-md"
                >
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
