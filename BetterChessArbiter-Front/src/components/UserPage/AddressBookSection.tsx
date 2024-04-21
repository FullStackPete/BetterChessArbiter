import { ChangeEvent, useEffect, useState } from "react";
import SectionContainer from "./SectionContainer";
import { AddressModel } from "../../models/AddressModel";
import TileTemplate from "./TileTemplate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Icon from "../Icon";
import useAuth from "../../hooks/useAuth";
type editInputProps = {
  defaultValue: string;
  type?: string;
  onChange: (arg1: ChangeEvent<HTMLInputElement>, arg2: string) => void;
  fieldName: string;
};

function EditInput({
  defaultValue,
  type,
  onChange,
  fieldName,
}: editInputProps) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e, fieldName)}
      className="border-b"
    />
  );
}

function AddressBookSection() {
  const { auth } = useAuth();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressModel[]>();
  const [editedValues, setEditedValues] = useState<Partial<AddressModel>>();
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
  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: e.target.value,
    }));
  };

  const handleApproveEdit = async () => {
    setIsEdited(false);
    console.log(editedValues);
    try {
      const res = await axiosPrivate.put(
        `/Address/${auth?.decodedToken.nameid}`,
        editedValues
      );
      if (res.status === 200) {
        setAddresses((prevAddresses) =>
          prevAddresses?.map((address) =>
            address.id === editedValues!.id
              ? { ...address, ...editedValues }
              : address
          )
        );
      }
      console.log("Res.data:", res.data);
      console.log("Res.status:", res.status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditClick = (initValues: AddressModel) => {
    setIsEdited(!isEdited);
    setEditedValues({
      userId: initValues.userId,
      id: initValues.id,
      name: initValues.name,
      city: initValues.city,
      country: initValues.country,
      street: initValues.street,
      houseNumber: initValues.houseNumber,
      postalCode: initValues.postalCode,
    });
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
                  key={address.id}
                  onIconClick={() => handleEditClick(address)}
                  topText={address.name}
                  iconName={"edit"}
                  bg={"#FBFEFB"}
                  isOption={false}
                >
                  {isEdited && (
                    <>
                      <EditInput
                        onChange={handleValueChange}
                        defaultValue={address.street}
                        fieldName="street"
                      />{" "}
                      <EditInput
                        onChange={handleValueChange}
                        type="text"
                        defaultValue={address.houseNumber}
                        fieldName="houseNumber"
                      />
                      <br />
                      <EditInput
                        onChange={handleValueChange}
                        defaultValue={address.postalCode}
                        fieldName="postalCode"
                      />{" "}
                      <EditInput
                        onChange={handleValueChange}
                        defaultValue={address.city}
                        type="text"
                        fieldName="city"
                      />
                      <br />
                      <EditInput
                        onChange={handleValueChange}
                        defaultValue={address.country}
                        fieldName="Country"
                      />
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
