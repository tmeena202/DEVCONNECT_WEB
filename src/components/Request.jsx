import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 py-12 px-4">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-extrabold text-white mb-10 tracking-wide">
        Connection Requests 🤝
      </h1>

      {/* Requests List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl 
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl 
            transition-all duration-300"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  alt="photo"
                  src={photoUrl}
                  className="w-20 h-20 rounded-full border-2 border-indigo-400 shadow-md"
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

                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  {about}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-5 py-2 rounded-xl font-semibold text-white 
                bg-red-500/80 hover:bg-red-600 transition shadow-md"
                >
                  Reject ✖
                </button>

                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-5 py-2 rounded-xl font-semibold text-white 
                bg-green-500/80 hover:bg-green-600 transition shadow-md"
                >
                  Accept ✔
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;
