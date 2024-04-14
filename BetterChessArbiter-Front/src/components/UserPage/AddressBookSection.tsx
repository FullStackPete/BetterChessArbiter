import { useEffect, useState } from "react";
import SectionContainer from "./SectionContainer";
import { AddressModel } from "../../models/AddressModel";
import TileTemplate from "./TileTemplate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Icon from "../Icon";
import useAuth from "../../hooks/useAuth";
type editInputProps = {
  defaultValue:string;
  type?:string;
}

function EditInput({defaultValue, type}:editInputProps){
return <input type={type} defaultValue={defaultValue} className="border-b" />
}

function AddressBookSection() {
  const { auth } = useAuth();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressModel[]>();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(
          `/Address/user/${auth?.decodedToken.nameid}`
        );
        console.log(res.data);
        isMounted && setAddresses(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, []);
  const handleApproveEdit = () => {
    setIsEdited(false);
  };
  const handleEditClick = () => {
    setIsEdited(true);
  };
  return (
    <>
      {addresses && (
        <SectionContainer background={"#F3D8C7"}>
          <div id="address-book" className="flex flex-col m-4">
            <div className="flex flex-row justify-between items-center">
              <p className="text-2xl font-semibold my-4">Address book</p>
              <Icon Icon="book_3" className="text-3xl font-medium" />
            </div>
            {addresses.length == 0 && (
              <p>
                You don't have any addresses. <u>Add one now!</u>{" "}
              </p>
            )}
            {addresses.map((address) => {
              return (
                <TileTemplate
                  onIconClick={handleEditClick}
                  topText={address.name}
                  iconName={"edit"}
                  bg={"#FBFEFB"}
                  isOption={false}
                >
                  {isEdited && (
                    <>
                      <EditInput defaultValue={address.street} />{" "}
                      <EditInput type="text" defaultValue={address.houseNumber} />
                      <br />
                      <EditInput defaultValue={address.postalCode} />{" "}
                      <EditInput defaultValue={address.city} type="text" />
                      <br />
                      <EditInput defaultValue={address.country} />
                      <br />
                      <button>
                        <Icon
                          onClick={handleApproveEdit}
                          Icon="check"
                          className="bg-green-400 rounded-sm"
                        />
                      </button>
                    </>
                  )}
                  {isEdited == false && (
                    <>
                      <p>
                        {address.street} {address.houseNumber}
                      </p>
                      <p>
                        {address.postalCode} {address.city}
                      </p>
                      <p> {address.country}</p>
                    </>
                  )}
                </TileTemplate>
              );
            })}
          </div>
        </SectionContainer>
      )}
    </>
  );
}
export default AddressBookSection;
