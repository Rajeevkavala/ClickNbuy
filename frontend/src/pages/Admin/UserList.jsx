import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";
import { toast } from "react-hot-toast";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="p-4 text-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 sm:text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-center">
          {/* <AdminMenu /> */}
          <Table className="w-full md:w-3/4 mx-auto">
            <Thead>
              <Tr className="bg-gray-800">
                <Th className="px-4 py-2 text-left">ID</Th>
                <Th className="px-4 py-2 text-left">NAME</Th>
                <Th className="px-4 py-2 text-left">EMAIL</Th>
                <Th className="px-4 py-2 text-left">ADMIN</Th>
                <Th className="px-4 py-2"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id} className="border-b border-gray-700">
                  <Td className="px-4 py-2">{user._id}</Td>
                  <Td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-[#181a1b] text-white"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {user.username}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2" />
                        </button>
                      </div>
                    )}
                  </Td>
                  <Td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-[#181a1b] text-white"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2" />
                        </button>
                      </div>
                    )}
                  </Td>
                  <Td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </Td>
                  <Td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UserList;
