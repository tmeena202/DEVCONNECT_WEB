import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) getFeed();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] flex flex-col items-center py-14 px-6"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* Page header */}
      <div className="w-full max-w-sm mb-10 text-left">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sky-400 mb-2">
          // feed
        </p>
        <h1 className="text-2xl font-medium tracking-tight text-neutral-100">
          Discover People
        </h1>
        <p className="mt-1 text-[0.78rem] text-neutral-500 font-light">
          Swipe or use the buttons to connect.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 font-mono text-[0.72rem] tracking-widest uppercase text-neutral-700 animate-pulse mt-20">
          <span>loading</span>
          <span className="text-sky-600">...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && feed && feed.length === 0 && (
        <div className="mt-20 flex flex-col items-center">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-neutral-700 mb-3">
            // feed
          </p>
          <p className="font-mono text-sm text-neutral-600">no new users found</p>
        </div>
      )}

      {/* Card stack */}
      {!loading && feed && feed.length > 0 && (
        <div className="flex flex-col items-center gap-6">

          {/* Swipe hints — flanking the card */}
          <div className="flex items-center gap-4 w-full max-w-[520px]">

            {/* Left — Ignore */}
            <div className="flex-1 flex flex-col items-center gap-1.5 border border-[#1f1f1f] rounded-sm py-3 px-2 bg-[#111111]">
              <span className="font-mono text-lg text-neutral-700">←</span>
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-red-500 font-semibold">Ignore</span>
              <span className="font-mono text-[0.58rem] text-neutral-700 text-center leading-relaxed">
                Swipe left to<br />skip this profile
              </span>
            </div>

            {/* Card stack */}
            <div className="relative w-[360px] h-[520px] flex-shrink-0">
              {feed.slice(0, 2).map((user, index) => (
                <div
                  key={user._id}
                  className={`absolute w-full h-full transition-all duration-300 ${
                    index === 0
                      ? "z-20"
                      : "z-10 scale-95 translate-y-3 opacity-50"
                  }`}
                >
                  <UserCard user={user} isTop={index === 0} />
                </div>
              ))}
            </div>

            {/* Right — Interested */}
            <div className="flex-1 flex flex-col items-center gap-1.5 border border-[#1f1f1f] rounded-sm py-3 px-2 bg-[#111111]">
              <span className="font-mono text-lg text-neutral-700">→</span>
              <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-sky-400 font-semibold">Interested</span>
              <span className="font-mono text-[0.58rem] text-neutral-700 text-center leading-relaxed">
                Swipe right to<br />send a request
              </span>
            </div>

          </div>

          {/* Bottom legend row */}
          <div className="flex items-center gap-6 font-mono text-[0.63rem] tracking-[0.1em] uppercase text-neutral-700">
            <span className="flex items-center gap-1.5">
              <span className="text-red-500">×</span> ignore — swipe left or press button
            </span>
            <span className="text-neutral-800">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-sky-400">✓</span> interested — swipe right or press button
            </span>
          </div>

          {/* Remaining count */}
          <p className="font-mono text-[0.62rem] tracking-widest uppercase text-neutral-800">
            {feed.length} profile{feed.length !== 1 ? "s" : ""} remaining
          </p>

        </div>
      )}
    </div>
  );
};

export default Feed;