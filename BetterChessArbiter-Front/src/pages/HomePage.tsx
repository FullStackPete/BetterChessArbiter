import { useNavigate } from "react-router-dom";
import PopularTournaments from "../components/HomePage.tsx/PopularTournaments";
import Wave from "../components/HomePage.tsx/Wave";
import ImageGallery from "../components/ImageGallery";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <section className="h-fit mt-12 bg-[#D0B8AC] pb-24">
        <p className="font-semibold text-2xl">Welcome to BetterChessArbiter</p>
        <p className="text-xl mt-4">
          A place where you can organize new tournaments, manage your favourites
          and search for those which suit you the best!
        </p>
        <p className="text-xl my-4">
          Sign up to get access to all of our great features. It's <em>free</em>{" "}
          and it's simply worth it.
        </p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="font-medium text-2xl mb-4 text-center">
              <em>Try now!</em>
            </p>
            {!auth.role && (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="rounded-lg px-4 py-2 text-xl font-semibold bg-white border-2 border-[#F3D8C7]"
                >
                  Sign up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-xl font-semibold p-2"
                >
                  or <u>Log in</u>
                </button>
              </>
            )}
          </div>
          <img
            className="h-48"
            src="./game-chess.svg"
            alt="https://iconduck.com/icons/76723/game-chess"
          />
        </div>
        <Wave
          rotate={true}
          fill="#EFEFEF"
          background="#D0B8AC"
          viewBox="0 0 1200 180"
        />
      </section>

      <section className="h-min-fit pb-16">
        <p className="text-2xl text-black">
          Most popular tournaments in Poland
        </p>
        <PopularTournaments />
        <Wave
          rotate={true}
          fill={"#FFFFFF"}
          background={""}
          viewBox={"0 0 1300 160"}
        />
      </section>
      <section className="bg-[#FFFFFF] h-min-fit pb-32">
        <p className="text-2xl text-center">
          Enroll to the tournaments of your choice in a matter of seconds!
        </p>
        <ImageGallery
          images={[
            {
              url: "florian-cordier-zOTpWmLyxdU-unsplash.jpg",
              alt: "Photo by Florian Cordier on Unsplash",
            },
            { url: "DSC01521.jpg", alt: "English championship, 2022, ECF" },
            {
              url: "alex-engelman-sRC7WXtZvkk-unsplash.jpg",
              alt: "Photo by Alex Engelman on Unsplash",
            },
            {
              url: "alex-engelman--LCRyAc0WfE-unsplash.jpg",
              alt: "Photo by Alex Engelman on Unsplash",
            },
          ]}
        />
        <p className="text-xl mt-12 text-center">
          Participating in a chess tournament is a great experience!
        </p>
        <Wave
          fill={"#EFE5DC"}
          background={""}
          viewBox={"140 0 800 80"}
          rotate={true}
        />
      </section>
    </>
  );
}

export default HomePage;
