import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SectionContainer from "./SectionContainer";
import { AddressModel } from "../../models/AddressModel";
import TileTemplate from "./TileTemplate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Icon from "../Icon";
import useAuth from "../../hooks/useAuth";
import DeleteConfirmation from "../AdminPanelPage/DeleteConfirmation";
import BgBlur from "../BgBlur";
type editInputProps = {
  defaultValue: string;
  type?: string;
  onChange: (
    arg1: ChangeEvent<HTMLInputElement>,
    arg2: string,
    arg3: string
  ) => void;
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
      onChange={(e) => onChange(e, fieldName, "edit")}
      className="border-b outline-none"
    />
  );
}

type isEditedType = {
  isEdited: boolean;
  addressId: string;
};

function AddressBookSection() {
  const { auth } = useAuth();
  const [isEdited, setIsEdited] = useState<isEditedType[]>([]);
  const [addresses, setAddresses] = useState<AddressModel[]>();
  const [editedValues, setEditedValues] = useState<Partial<AddressModel>>();
  const [confirmation, setConfirmation] = useState<boolean>();
  const [addressIdToDelete, setAddressIdToDelete] = useState<string>();
  const [newAddressValues, setNewAddressValues] = useState<
    Partial<AddressModel>
  >({ userId: auth?.decodedToken.nameid });
  const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosPrivate.get(
          `/Address/user/${auth?.decodedToken.nameid}`
        );
        isMounted && setAddresses(res.data as AddressModel[]);
        isMounted &&
          setIsEdited((prevAddress) => {
            // Map over the fetched addresses and create an array of isEdited objects
            const newEditedStates = (res.data as AddressModel[]).map(
              (address) => ({
                addressId: address.id,
                isEdited: false,
              })
            );
            // Combine the existing isEdited states with the newly created ones
            return [...prevAddress, ...newEditedStates];
          });
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
    field: string,
    type: "edit" | "add"
  ) => {
    switch (type) {
      case "edit":
        setEditedValues((prevValues) => ({
          ...prevValues,
          [field]: e.target.value,
        }));
        break;
      case "add":
        setNewAddressValues((prevValues) => ({
          ...prevValues,
          [field]: e.target.value,
        }));
        break;
      default:
        break;
    }
  };
  async function handleDelete(confirmed: boolean) {
    // if (confirmed == true) {
    //   try {
    //     const res = await axiosPrivate.delete(`/User/${userIdToDelete}`);
    //     console.log(res.data);
    //     setUsers((prev) => prev!.filter((user) => user.id !== userIdToDelete));
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     console.log(users);
    //   }
    // }
    setConfirmation(false);
  }
  const handleNewAddressSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post("/Address", newAddressValues);
      if (res.status === 200) {
        setAddresses((prev) => [...prev, res.data]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleApproveEdit = async (
    addressId: string,
    action: "approve" | "reject"
  ) => {
    setIsEdited((prevIsEdited) =>
      prevIsEdited.map((object) =>
        object.addressId == addressId ? { ...object, isEdited: false } : object
      )
    );
    console.log(isEdited);
    if (action == "reject") {
      return null;
    }
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
    } catch (error) {
      console.log(error);
    }
  };
  const confirmAddressDelete = (userId: string) => {
    setConfirmation(true);
    setAddressIdToDelete(userId); // Dodaj tę linię, aby zapamiętać identyfikator użytkownika do usunięcia
  };
  const handleEditClick = (initValues: AddressModel) => {
    console.log(isEdited);
    setIsEdited((prevValues) => {
      return prevValues.map((object) => {
        if (object.addressId === initValues.id) {
          return { ...object, isEdited: !object.isEdited }; // Zmienia isEdited na true tylko dla pasującego adresu
        }
        return { ...object, isEdited: false }; // Zwraca niezmienione obiekty dla innych adresów
      });
    });
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

  const splitAddressesIntoPairs = (addresses: AddressModel[]) => {
    const pairs: AddressModel[][] = [];
    for (let i = 0; i < addresses.length; i += 2) {
      const pair: AddressModel[] = [];
      if (addresses[i]) pair.push(addresses[i]);
      if (addresses[i + 1]) pair.push(addresses[i + 1]);
      pairs.push(pair);
    }
    return pairs;
  };
  const renderAddressPairs = (addressPairs: AddressModel[][]) => {
    return addressPairs.map((pair, index) => (
      <div className="flex flex-row" key={index}>
        {pair.map((address) => (
          <TileTemplate
            key={address.id}
            onIconClick={() => handleEditClick(address)}
            topText={address.name}
            iconName={"edit"}
            bg={"#FBFEFB"}
            isOption={false}
          >
            {isEdited.find((object) => object.addressId === address.id)
              ?.isEdited == true && (
              <>
                <EditInput
                  onChange={(e) => handleValueChange(e, "street", "edit")}
                  defaultValue={address.street}
                  fieldName="street"
                />{" "}
                <EditInput
                  onChange={(e) => handleValueChange(e, "houseNumber", "edit")}
                  type="text"
                  defaultValue={address.houseNumber}
                  fieldName="houseNumber"
                />
                <br />
                <EditInput
                  onChange={(e) => handleValueChange(e, "postalCode", "edit")}
                  defaultValue={address.postalCode}
                  fieldName="postalCode"
                />{" "}
                <EditInput
                  onChange={(e) => handleValueChange(e, "city", "edit")}
                  defaultValue={address.city}
                  type="text"
                  fieldName="city"
                />
                <br />
                <EditInput
                  onChange={(e) => handleValueChange(e, "Country", "edit")}
                  defaultValue={address.country}
                  fieldName="Country"
                />
                <br />
                <div className="flex flex-row justify-between mx-10">
                  <button>
                    <Icon
                      onClick={() => handleApproveEdit(address.id, "approve")}
                      Icon="check"
                      className="bg-green-400 rounded-sm"
                    />
                  </button>
                  <button>
                    <Icon
                      onClick={() => handleApproveEdit(address.id, "reject")}
                      Icon="close"
                      className="bg-red-400 rounded-sm"
                    />
                  </button>
                  <button>
                    <Icon
                      onClick={() => confirmAddressDelete(address.id)}
                      Icon="delete"
                    />
                  </button>
                </div>
              </>
            )}
            {isEdited.find((object) => object.addressId === address.id)
              ?.isEdited == false && (
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
        ))}
        {confirmation && (
          <DeleteConfirmation
            handleDelete={handleDelete}
            warningText={"The action is"}
          />
        )}
        {confirmation && <BgBlur />}
      </div>
    ));
  };

  // Podział adresów na pary
  const addressPairs = splitAddressesIntoPairs(addresses || []);

  return (
    <>
      {addresses && (
        <SectionContainer background={"#F3D8C7"}>
          <div id="address-book" className="flex flex-col m-2">
            <div className="flex flex-row justify-between items-center">
              <p className="text-2xl font-semibold my-4">Address book</p>
              <div className="relative">
                <Icon
                  Icon="add"
                  onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                  className=" text-3xl font-medium mx-4"
                />
                <Icon Icon="book_3" className="text-3xl font-medium" />
                {showNewAddressForm && (
                  <div className="addNewAddress bg-white shadow-lg absolute rounded-md p-4 right-14">
                    <p className="font-semibold text-lg">Add new address</p>
                    <form onSubmit={handleNewAddressSubmit}>
                      <label htmlFor="name">Name</label>
                      <input
                        onChange={(e) => handleValueChange(e, "name", "add")}
                        id="name"
                        name="name"
                        type="text"
                        className="border-b outline-none"
                      />
                      <label htmlFor="">Street</label>
                      <input
                        onChange={(e) => handleValueChange(e, "street", "add")}
                        name="street"
                        id="street"
                        type="text"
                        className="border-b outline-none"
                      />
                      <label htmlFor="houseNum">House Number</label>
                      <input
                        onChange={(e) =>
                          handleValueChange(e, "houseNumber", "add")
                        }
                        name="houseNum"
                        id="houseNum"
                        type="text"
                        className="border-b outline-none"
                      />

                      <label htmlFor="postcode">Postal code</label>
                      <input
                        onChange={(e) =>
                          handleValueChange(e, "postalCode", "add")
                        }
                        name="postcode"
                        id="postcode"
                        type="text"
                        className="border-b outline-none"
                      />
                      <label htmlFor="addcity">City</label>
                      <input
                        onChange={(e) => handleValueChange(e, "city", "add")}
                        name="addcity"
                        id="addcity"
                        type="text"
                        className="border-b outline-none"
                      />
                      <label htmlFor="country">Country</label>
                      <input
                        onChange={(e) => handleValueChange(e, "country", "add")}
                        name="country"
                        id="country"
                        type="text"
                        className="border-b outline-none"
                      />
                      <input
                        type="submit"
                        className="bg-black text-white p-2"
                        value={"Add!"}
                      />
                    </form>
                  </div>
                )}
              </div>
            </div>
            {addresses.length == 0 && (
              <p>
                You don't have any addresses. <u>Add one now!</u>{" "}
              </p>
            )}
            {renderAddressPairs(addressPairs)}
          </div>
        </SectionContainer>
      )}
    </>
  );
}
export default AddressBookSection;
