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
  defaultValue: string | boolean;
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
  if (type == "checkbox")
    return (
      <input
        type={type}
        defaultChecked={defaultValue as boolean}
        onChange={(e) => onChange(e, fieldName, "edit")}
        className="border-b outline-none"
      />
    );
  return (
    <input
      type={type}
      defaultValue={defaultValue as string}
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
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [editedValues, setEditedValues] = useState<Partial<AddressModel>>({});
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<string>("");
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
        if (isMounted) {
          setAddresses(res.data as AddressModel[]);
          const newEditedStates = (res.data as AddressModel[]).map(
            (address) => ({
              addressId: address.id,
              isEdited: false,
            })
          );
          setIsEdited(newEditedStates);
        }
        console.log("Addresses:", addresses);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate, auth?.decodedToken.nameid]);

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    type: "edit" | "add"
  ) => {
    switch (type) {
      case "edit":
        let newValue: boolean | string = e.target.value;
        if (field == "isPrimary") {
          newValue = e.target.checked;
          console.log(newValue);
        }
        console.log(newValue);
        console.log(editedValues);
        setEditedValues((prevValues) => ({
          ...prevValues,
          [field]: newValue,
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
    if (confirmed) {
      try {
        await axiosPrivate.delete(`/Address/${addressIdToDelete}`);
        setAddresses((prev) =>
          prev.filter((address) => address.id !== addressIdToDelete)
        );
      } catch (err) {
        console.log(err);
      }
    }
    setConfirmation(false);
  }

  const handleNewAddressSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axiosPrivate.post("/Address", newAddressValues);
      if (res.data) {
        setAddresses((prev) => [...prev, res.data]);
        setShowNewAddressForm(false);
        setNewAddressValues({ userId: auth?.decodedToken.nameid });
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
        object.addressId === addressId ? { ...object, isEdited: false } : object
      )
    );

    if (action === "reject") {
      return;
    }

    try {
      // Ensure editedValues contains the correct address data
      const updatedAddress = {
        ...addresses.find((address) => address.id === addressId),
        ...editedValues,
      };
      console.log("Updated address:", updatedAddress);
      const res = await axiosPrivate.put(
        `/Address/${updatedAddress.id}`,
        updatedAddress
      );

      if (res.status === 200) {
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.id === updatedAddress.id
              ? { ...address, ...updatedAddress }
              : { ...address, isPrimary: false }
          )
        );
        setEditedValues({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmAddressDelete = (userId: string) => {
    setConfirmation(true);
    setAddressIdToDelete(userId);
  };

  const handleEditClick = (initValues: AddressModel) => {
    setIsEdited((prevValues) =>
      prevValues.map((object) =>
        object.addressId === initValues.id
          ? { ...object, isEdited: !object.isEdited }
          : object
      )
    );
    setEditedValues({
      userId: initValues.userId,
      id: initValues.id,
      name: initValues.name,
      city: initValues.city,
      country: initValues.country,
      street: initValues.street,
      houseNumber: initValues.houseNumber,
      postalCode: initValues.postalCode,
      isPrimary: initValues.isPrimary,
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
            className={`border-2 ${
              address.isPrimary ? " border-blue-400" : " border-gray-200"
            }`}
            key={address.id}
            onIconClick={() => handleEditClick(address)}
            topText={address.name}
            iconName={"edit"}
            bg={"#FBFEFB"}
            isOption={false}
          >
            {isEdited.find((object) => object.addressId === address.id)
              ?.isEdited && (
              <>
                <EditInput
                  onChange={(e) => handleValueChange(e, "street", "edit")}
                  defaultValue={address.street}
                  fieldName="street"
                />
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
                />
                <EditInput
                  onChange={(e) => handleValueChange(e, "city", "edit")}
                  defaultValue={address.city}
                  type="text"
                  fieldName="city"
                />
                <br />
                <EditInput
                  onChange={(e) => handleValueChange(e, "country", "edit")}
                  defaultValue={address.country}
                  fieldName="country"
                />
                <br />
                <EditInput
                  type="checkbox"
                  defaultValue={address.isPrimary}
                  onChange={(e) => handleValueChange(e, "isPrimary", "edit")}
                  fieldName={"isPrimary"}
                />

                <div className="flex flex-col">
                  <div className="flex flex-row justify-between my-2">
                    <button
                      onClick={() => handleApproveEdit(address.id, "approve")}
                      className="rounded-md p-2 bg-green-400 font-medium"
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-400 rounded-md font-medium p-2"
                      onClick={() => handleApproveEdit(address.id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                  <button
                    onClick={() => confirmAddressDelete(address.id)}
                    className="rounded-md bg-gray-300 w-12 h-8 self-center items-center justify-center flex"
                  >
                    <Icon Icon="delete" className="text-red-500" />
                  </button>
                </div>
              </>
            )}
            {!isEdited.find((object) => object.addressId === address.id)
              ?.isEdited && (
              <>
                <p>
                  {address.street} {address.houseNumber}
                </p>
                <p>
                  {address.postalCode} {address.city}
                </p>
                <p>{address.country}</p>
                {address.isPrimary && (
                  <p className="font-medium underline">Primary address</p>
                )}
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
                  className="text-3xl font-medium mx-4"
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
                      <label htmlFor="street">Street</label>
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
                      <div className="flex items-center justify-center">
                        <input
                          type="submit"
                          className="bg-black text-white p-2 rounded-md mt-2"
                          value={"Add!"}
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            {addresses.length === 0 && (
              <p>
                You don't have any addresses.{" "}
                <u onClick={() => setShowNewAddressForm(true)}>Add one now!</u>{" "}
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
