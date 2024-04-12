import SectionContainer from "./SectionContainer";

function FavouritesSection() {
  return (
    <SectionContainer background={"#FBFEFB"}>
        <div id="favourites" className="m-4 flex flex-col">
      <p  className=" text-2xl font-semibold my-4">
        Your favourites
      </p>
      </div>
    </SectionContainer>
  );
}

export default FavouritesSection;
