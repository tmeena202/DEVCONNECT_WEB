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
      await axios.post(
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-xl">
        No Requests Found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black py-12 px-4">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-bold text-slate-100 mb-12">
        Connection Requests
      </h1>

      {/* Requests List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 
              rounded-2xl bg-slate-800 border border-slate-700 shadow-lg
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Profile Image */}
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
              />

              {/* User Info */}
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

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-5 py-2 rounded-lg font-semibold text-white 
                  bg-rose-600 hover:bg-rose-700 transition duration-300 shadow-md"
                >
                  Reject
                </button>

                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-5 py-2 rounded-lg font-semibold text-white 
                  bg-teal-600 hover:bg-teal-700 transition duration-300 shadow-md"
                >
                  Accept
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
