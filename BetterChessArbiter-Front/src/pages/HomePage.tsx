import { useNavigate } from "react-router-dom";
import PopularTournaments from "../components/HomePage/PopularTournaments";
import Wave from "../components/HomePage/Wave";
import ImageGallery from "../components/ImageGallery";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

type ContainerProps = {
  extraSecClass?:string
  extraDivClass?:string
  children:React.ReactNode
}

function Container({extraSecClass, extraDivClass, children}: ContainerProps){
  return <section className={`md:flex md:justify-center ${extraSecClass}`}>
    <div className={`md:w-7/12 md:flex md:justify-center md:flex-col ${extraDivClass}`}>{children}</div>
  </section>
}


function HomePage() {
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Container extraSecClass="h-fit mt-12 bg-[#D0B8AC] pb-24 ">
        
        <p className="font-semibold text-2xl">Welcome to BetterChessArbiter</p>
        <p className="text-xl mt-4">
          Browse the most popular tournaments as well as your favourites in a
          matter of secconds!
        </p>
        {!auth?.role && (
          <>
            <p className="text-xl mt-4">
              A place where you can organize new tournaments, manage your
              favourites and search for those which suit you the best!
            </p>
            <p className="text-xl my-4">
              Sign up to get access to all of our great features. It's <em>free</em> and it's simply worth it.
            </p>
          </>
        )}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            {!auth?.role && (
              <>
                <p className="font-medium text-2xl mb-4 text-center">
                  <em>Try now!</em>
                </p>
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
            {auth?.role && 
            <button
            onClick={() => navigate(`/user/${auth.decodedToken.nameid}#favourites`)} className="rounded-lg px-4 py-2 text-xl font-semibold bg-white border-2 border-[#F3D8C7]">
            Favourites
          </button>
            
            }
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
          viewBox="0 0 1200 120"
        />
      </Container>

      <Container extraSecClass="h-min-fit pb-16">
        <p className="text-2xl text-black">
          Most popular tournaments in Poland
        </p>
        <PopularTournaments />
        <Wave
          rotate={true}
          fill={"#FFFFFF"}
          viewBox={"0 0 1200 120"}
        />
      </Container>
      <Container extraSecClass="bg-[#FFFFFF] h-min-fit pb-32">
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
          viewBox={"140 0 800 80"}
          rotate={true}
        />
      </Container>
    </>
  );
}

export default HomePage;
