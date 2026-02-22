import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const UserCard = ({ user, isTop }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const likeOpacity   = useTransform(x, [0, 150],   [0, 1]);
  const ignoreOpacity = useTransform(x, [-150, 0],  [1, 0]);

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
    await animate(x, finalX, { type: "spring", stiffness: 600, damping: 40 });
    handleSendRequest(direction === "right" ? "interested" : "ignored", _id);
  };

  return (
    <motion.div
      style={isTop ? { x, rotate } : {}}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      whileTap={{ scale: 0.985 }}
      onDragEnd={(event, info) => {
        if (!isTop) return;
        if (info.offset.x > 120)       swipe("right");
        else if (info.offset.x < -120) swipe("left");
        else animate(x, 0, { type: "spring", stiffness: 600, damping: 35 });
      }}
      className="w-full h-full rounded-sm overflow-hidden bg-[#111111] border border-[#1f1f1f] shadow-2xl shadow-black/60 cursor-grab active:cursor-grabbing"
    >
      {/* ── Photo ── */}
      <div className="relative h-[65%]">
        <img
          src={photoUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/30 to-transparent" />

        {/* INTERESTED stamp */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-5 left-5 font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-sky-400 border-2 border-sky-400 px-3 py-1.5 -rotate-[18deg] select-none"
        >
          Interested
        </motion.div>

        {/* IGNORE stamp */}
        <motion.div
          style={{ opacity: ignoreOpacity }}
          className="absolute top-5 right-5 font-mono text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-red-500 border-2 border-red-500 px-3 py-1.5 rotate-[18deg] select-none"
        >
          Ignore
        </motion.div>

        {/* Age badge */}
        {age && (
          <div className="absolute top-4 right-4 font-mono text-[0.65rem] tracking-widest text-neutral-300 bg-black/60 border border-[#2e2e2e] px-2.5 py-1 rounded-sm">
            {age} yrs
          </div>
        )}

        {/* Name / gender */}
        <div className="absolute bottom-5 left-5">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
            {firstName} {lastName}
          </h2>
          {gender && (
            <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-neutral-500 mt-1">
              {gender}
            </p>
          )}
        </div>
      </div>

      {/* ── Info + Actions ── */}
      <div className="h-[35%] px-5 py-4 flex flex-col justify-between bg-[#111111]">
        <p className="text-[0.78rem] text-neutral-500 leading-relaxed line-clamp-3 font-light">
          {about}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => swipe("left")}
            className="flex-1 py-2.5 rounded-sm font-mono font-semibold text-[0.7rem] tracking-[0.1em] uppercase border border-[#2e2e2e] text-neutral-500 hover:border-red-500 hover:text-red-500 hover:bg-[#1a0808] transition-all duration-150 cursor-pointer"
          >
            × Ignore
          </button>

          <button
            onClick={() => swipe("right")}
            className="flex-1 py-2.5 rounded-sm font-mono font-semibold text-[0.7rem] tracking-[0.1em] uppercase bg-sky-400 text-black hover:bg-sky-300 active:scale-[0.99] transition-all duration-150 cursor-pointer"
          >
            ✓ Interested
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;