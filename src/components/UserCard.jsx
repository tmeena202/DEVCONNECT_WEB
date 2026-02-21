import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const UserCard = ({ user, isTop }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const ignoreOpacity = useTransform(x, [-150, 0], [1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  const swipe = async (direction) => {
    const finalX = direction === "right" ? 700 : -700;

    await animate(x, finalX, {
      type: "spring",
      stiffness: 300,
      damping: 25,
    });

    handleSendRequest(direction === "right" ? "interested" : "ignored", _id);
  };

  return (
    <motion.div
      style={isTop ? { x, rotate } : {}}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      whileTap={{ scale: 0.98 }}
      onDragEnd={(event, info) => {
        if (!isTop) return;

        if (info.offset.x > 120) {
          swipe("right");
        } else if (info.offset.x < -120) {
          swipe("left");
        } else {
          animate(x, 0, { type: "spring", stiffness: 300 });
        }
      }}
      className="w-full h-full rounded-3xl overflow-hidden 
      bg-slate-800/95 border border-slate-700 
      shadow-2xl backdrop-blur-xl
      cursor-grab active:cursor-grabbing"
    >
      <div className="relative h-[65%]">
        <img
          src={photoUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* INTERESTED */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-6 left-6 text-teal-400 border-4 border-teal-400 px-4 py-2 text-xl font-bold rotate-[-20deg]"
        >
          INTERESTED
        </motion.div>

        {/* IGNORE */}
        <motion.div
          style={{ opacity: ignoreOpacity }}
          className="absolute top-6 right-6 text-rose-400 border-4 border-rose-400 px-4 py-2 text-xl font-bold rotate-[20deg]"
        >
          IGNORE
        </motion.div>

        {age && (
          <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-xs text-white">
            {age} yrs
          </div>
        )}

        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl font-bold text-white">
            {firstName} {lastName}
          </h2>
          {gender && (
            <p className="text-slate-300 text-sm mt-1 capitalize">{gender}</p>
          )}
        </div>
      </div>

      <div className="h-[35%] px-6 py-5 flex flex-col justify-between">
        <p className="text-slate-400 text-sm line-clamp-3">{about}</p>

        <div className="flex gap-4">
          <button
            onClick={() => swipe("left")}
            className="flex-1 py-3 rounded-xl font-semibold border border-rose-600 text-rose-500 hover:bg-rose-600 hover:text-white transition-all"
          >
            Ignore
          </button>

          <button
            onClick={() => swipe("right")}
            className="flex-1 py-3 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-all"
          >
            Interested
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
