require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_CONNECT)
  .then((res) => console.log("connect db"))
  .catch((error) => console.log(error));

const BlogEvents = require("./models/BlogEvents");

async function addingManyData() {
  BlogEvents.insertMany([
    {
      id: "e1",
      title: "Web Dev Networking Night",
      image: "https://s31606.pcdn.co/wp-content/uploads/2023/04/shutterstock_479653459.jpg",
      description:
        "Meet, connect, and network with fellow budding web developers. Share your experiences and learn from others.",
      time: "18:00",
      location: "Innovation Lounge, New York, NY",
    },
    {
      id: "e2",
      title: "City Hunt: Web Dev Edition",
      image: "https://wallpapers.com/images/hd/tokyo-pictures-hn6oczkdscnf6awt.jpg",
      description: "Explore the city and discover hidden gems while completing fun web development challenges.",
      time: "10:00",
      location: "Tech Training Academy, Los Angeles, CA",
    },
    {
      id: "e3",
      title: "Women in Web Development Mixer!",
      image: "https://compote.slate.com/images/ad27ef8a-0ea1-46b7-b515-415c4af18528.jpg",
      description:
        "An empowering event dedicated to women who are passionate about web development. Connect, share, and inspire.",

      time: "16:30",
      location: "Empowerment Hall, Seattle, WA",
    },
    {
      id: "e4",
      title: "Beginner's Guide to HTML & CSS",
      image:
        "https://img.freepik.com/premium-photo/close-up-laptop-computer-with-code-screen-cozy-home-office-workplace-lit-by-lamplight-copy_236854-39339.jpg",
      description:
        "Dive into the world of HTML and CSS. This workshop is perfect for those taking their first steps in web development.",

      time: "18:30",
      location: "Learning Labs, Austin, TX",
    },
  ]);
}
