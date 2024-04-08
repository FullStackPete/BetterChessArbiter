type UserDeleteBtnProps = {
  confirmDelete: () => void;
};
function UserDeleteBtn({ confirmDelete }: UserDeleteBtnProps) {
  return (
    <>
      <button
        className="border border-red-700 p-1 rounded-md bg-red-500 text-white font-bold text-sm"
        onClick={confirmDelete}
      >
        Delete user
      </button>
    </>
  );
}

export default UserDeleteBtn;
