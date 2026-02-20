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

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-slate-100 mb-10">
        Discover People
      </h1>

      {loading && (
        <div className="text-slate-400 text-lg animate-pulse">
          Loading feed...
        </div>
      )}

      {!loading && feed && feed.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 shadow-lg text-center">
          <h2 className="text-xl font-semibold text-slate-200">
            No new users found
          </h2>
        </div>
      )}

      {!loading && feed && feed.length > 0 && (
        <div className="relative w-[380px] h-[520px]">
          {feed.slice(0, 2).map((user, index) => (
            <div
              key={user._id}
              className={`absolute w-full h-full transition-all duration-500 ${
                index === 0 ? "z-20" : "z-10 scale-95 translate-y-4 opacity-80"
              }`}
            >
              <UserCard user={user} isTop={index === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
