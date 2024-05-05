type DeleteConfirmationProps = {
  handleDelete: (arg1: boolean) => void;
  warningText:string
};
function DeleteConfirmation({ handleDelete,warningText }: DeleteConfirmationProps) {
  return (
    <>
      {/* delete user is always the last because this component renders user-times. Which is why this component needs to be moved outside the user.map. */}
      <div className=" bg-white w-max p-2 z-30 max-w-[80vw] text-center rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        Confirm delete
        <p className="text-base text-gray-500">
          {warningText}{" "}
          <em className="font-bold">permanent</em>.
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => handleDelete(false)}
            className="m-4 text-base bg-blue-400 text-white p-2 rounded-md font-bold"
          >
            Go back
          </button>
          <button
            onClick={() => handleDelete(true)}
            className="m-4 text-base bg-red-500 text-white p-2 rounded-md font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;
