import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/feedbacks")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading feedbacks...</p>;
  if (feedbacks.length === 0)
    return <p className="text-center mt-10">No feedbacks found.</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // or more if you want
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Teacher Feedbacks</h2>
      <Slider {...settings}>
        {feedbacks.map(({ _id, feedback, user, classTitle }) => (
          <div key={_id} className="p-4">
            <div
              className="border rounded-lg p-6 shadow-lg h-full flex flex-col justify-between"
              style={{ maxWidth: "300px", margin: "0 auto" }}
            >
              <p className="text-gray-800 italic mb-4">"{feedback}"</p>
              <div className="flex items-center mt-auto">
                <img
                  src={user?.photo || "/default-avatar.png"}
                  alt={user?.name || "User"}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-lg">{user?.name || "Anonymous"}</p>
                  <p className="text-sm text-gray-600">{classTitle || "Class"}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Feedbacks;
