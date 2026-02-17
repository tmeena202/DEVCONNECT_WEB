import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Failed to fetch UserCard:", err);
    }
  };

  return (
    <div className="w-96 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-[1.02] transition-all duration-300">
      {/* Profile Image */}
      <div className="relative">
        <img src={photoUrl} alt="photo" className="w-full h-64 object-cover" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Name Badge */}
        <div className="absolute bottom-4 left-4">
          <h2 className="text-2xl font-bold text-white">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-sm text-gray-300 mt-1">
              {age} • {gender}
            </p>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* About */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {about}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 pt-2">
          {/* Ignore */}
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-1/2 py-3 rounded-xl font-semibold text-white 
          bg-red-500/70 hover:bg-red-600 transition duration-300 shadow-md"
          >
            ❌ Ignore
          </button>

          {/* Interested */}
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="w-1/2 py-3 rounded-xl font-semibold text-white 
          bg-green-500/70 hover:bg-green-600 transition duration-300 shadow-md"
          >
            💚 Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
