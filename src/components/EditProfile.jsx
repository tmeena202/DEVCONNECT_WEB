import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const FIELDS = [
  { label: "first_name", key: "firstName", type: "text", col: 1 },
  { label: "last_name",  key: "lastName",  type: "text", col: 1 },
  { label: "photo_url",  key: "photoUrl",  type: "text", col: 2 },
  { label: "age",        key: "age",       type: "text", col: 1 },
  { label: "gender",     key: "gender",    type: "text", col: 1 },
];

const inputClass =
  "w-full bg-[#080808] border border-[#262626] rounded-sm px-3 py-2.5 font-mono text-[0.78rem] text-neutral-200 placeholder-neutral-600 outline-none focus:border-sky-400 focus:bg-[#0d0d0d] caret-sky-400 transition-colors duration-150";

const labelClass =
  "block font-mono text-[0.63rem] tracking-[0.14em] uppercase text-neutral-600 mb-1.5";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName,  setLastName]  = useState(user.lastName);
  const [photoUrl,  setPhotoUrl]  = useState(user.photoUrl);
  const [age,       setAge]       = useState(user.age    || "");
  const [gender,    setGender]    = useState(user.gender || "");
  const [about,     setAbout]     = useState(user.about  || "");
  const [error,     setError]     = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const setters = { firstName: setFirstName, lastName: setLastName, photoUrl: setPhotoUrl, age: setAge, gender: setGender };
  const values  = { firstName, lastName, photoUrl, age, gender };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 py-14 px-6" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="max-w-6xl mx-auto">

          {/* Page header */}
          <div className="mb-10">
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-sky-400 mb-2">
              // profile
            </p>
            <h1 className="text-2xl font-medium tracking-tight text-neutral-100">
              Profile Settings
            </h1>
            <p className="mt-1 text-[0.78rem] text-neutral-500 font-light">
              Update your personal information and preview changes in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:items-start">

            {/* ── Left: Form ── */}
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-sm p-8 flex flex-col gap-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                {["firstName", "lastName"].map((key) => (
                  <div key={key}>
                    <label className={labelClass}>
                      {key === "firstName" ? "first_name" : "last_name"}
                    </label>
                    <input
                      type="text"
                      value={values[key]}
                      onChange={(e) => setters[key](e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>

              {/* Photo URL */}
              <div>
                <label className={labelClass}>photo_url</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Age + Gender row */}
              <div className="grid grid-cols-2 gap-4">
                {["age", "gender"].map((key) => (
                  <div key={key}>
                    <label className={labelClass}>{key}</label>
                    <input
                      type="text"
                      value={values[key]}
                      onChange={(e) => setters[key](e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>

              {/* About */}
              <div>
                <label className={labelClass}>about</label>
                <textarea
                  value={about}
                  rows={4}
                  onChange={(e) => setAbout(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="px-3 py-2 bg-[#1a0808] border border-[#2e1010] border-l-[3px] border-l-red-500 rounded-sm font-mono text-[0.71rem] text-red-400">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={saveProfile}
                className="w-full mt-1 bg-sky-400 hover:bg-sky-300 active:scale-[0.99] transition-all duration-150 text-black font-mono font-semibold text-[0.72rem] tracking-[0.1em] uppercase py-2.5 rounded-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>

            {/* ── Right: Preview ── */}
            <div className="sticky top-20">
              <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-neutral-600 mb-4">
                // live preview
              </p>
              <div className="bg-[#111111] border border-[#1f1f1f] rounded-sm p-6 flex items-center justify-center overflow-hidden">
                <UserCard
                  user={{ firstName, lastName, photoUrl, age, gender, about }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#111111] border border-[#262626] border-l-[3px] border-l-sky-400 rounded-sm shadow-2xl shadow-black/60 font-mono text-[0.72rem] text-sky-400">
            <span className="text-sky-400 select-none">✓</span>
            profile updated successfully
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;