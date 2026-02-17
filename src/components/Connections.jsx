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
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 px-4">
      {/* Page Heading */}
      <h1 className="text-center text-4xl font-extrabold text-white mb-12 tracking-wide">
        Your Connections 🌐
      </h1>

      {/* Connections List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl 
            hover:shadow-2xl transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400 shadow-md"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-gray-300 text-sm mt-1">
                    {age} • {gender}
                  </p>
                )}

                <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-2">
                  {about}
                </p>
              </div>

              {/* Chat Button */}
              <Link to={"/chat/" + _id}>
                <button
                  className="px-6 py-2 rounded-xl font-semibold text-white 
                bg-indigo-500 hover:bg-indigo-600 transition duration-300 
                shadow-lg hover:shadow-indigo-500/50"
                >
                  💬 Chat
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
