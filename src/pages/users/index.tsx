import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [selectedUser, setSelectedUser] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://dummyjson.com/users";
        const response = await axios.get(apiUrl);
        const usersData = response.data.users;
        setUsers(usersData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowDetailUser = (user: any) => {
    console.log(user);
    setSelectedUser(user);
  };

  const handleCloseDetailUser = () => {
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentPageData = users.slice(indexOfFirstUser, indexOfLastUser);
  const pageCount = Math.ceil(users.length / usersPerPage);

  return (
    <>
      {/* List User */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentPageData.map((user: any) => (
            <button
              key={user.id}
              className="bg-white rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 text-left"
              onClick={() => handleShowDetailUser(user)}
            >
              <img src={user.image} className="w-8 h-8 rounded-full mb-4" />
              <p className="text-lg font-semibold mb-1">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-gray-500">{user.email}</p>
            </button>
          ))}
        </div>
        <div className="flex mt-4">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index + 1}
              className={`mr-2 px-4 py-2 border transition duration-300 ease-in-out ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white transform scale-105"
                  : "bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-700"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal User */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/2 p-6 rounded">
            <div className="flex items-center justify-center mb-4">
              <img
                src={selectedUser.image}
                alt="Avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
                <p className="text-gray-600">{`Age: ${selectedUser.age}`}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              <strong>Email</strong>
              {`: ${selectedUser.email}`}
            </p>
            <div className="mb-4">
              <p className="text-gray-700">
                <strong>Address</strong>
                {`: ${selectedUser.address.address}, ${selectedUser.address.city}`}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-500">
                Card Block
              </h3>
              <p className="text-gray-700">
                <strong>Card Number</strong>
                {`: ${selectedUser.bank.cardNumber}`}
              </p>
              <p className="text-gray-700">
                <strong>Card Type</strong>
                {`: ${selectedUser.bank.cardType}`}
              </p>
              <p className="text-gray-700">
                <strong>Card Expire</strong>
                {`: ${selectedUser.bank.cardExpire}`}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-500">
                Company Block
              </h3>

              <p className="text-gray-700">
                <strong>Company Name</strong>
                {`: ${selectedUser.company.name}`}
              </p>
              <p className="text-gray-700">
                <strong>Company Address</strong>
                {`: ${selectedUser.company.address.address}, ${selectedUser.company.address.city}`}
              </p>
              <p className="text-gray-700">
                <strong>Department</strong>
                {`: ${selectedUser.company.department}`}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseDetailUser}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
