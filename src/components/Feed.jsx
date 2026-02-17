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

  // ✅ Fetch feed only if feed is empty
  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, [feed]);

  // ✅ No Users Found
  if (feed && feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-lg font-semibold">
        No new users found!
      </h1>
    );
  }

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
