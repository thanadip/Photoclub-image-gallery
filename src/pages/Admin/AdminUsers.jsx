import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Text,
  Card,
  Stack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";
import UniversalNav from "../../components/UniversalNav";
import Swal from "sweetalert2";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5001/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.user_id !== userId)
          );
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "User deleted!",
            confirmButtonText: "OK",
          });
        } else if (response.status === 404) {
          await Swal.fire({
            icon: "question",
            title: "Not found",
            text: "User not found!",
            confirmButtonText: "OK",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to delete ",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete ",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const updateUserType = async (userId, userType) => {
    await fetch(`http://localhost:5001/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_type_id: userType }),
    })
      .then(async (response) => {
        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === userId
                ? { ...user, user_type_id: userType }
                : user
            )
          );
          await Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Success to updated user! ",
            confirmButtonText: "OK",
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to updated user! ",
            confirmButtonText: "OK",
          });
        }
      })
      .catch(
        async (error) =>
          await Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to updated user! ",
            confirmButtonText: "OK",
          })
      );
  };

  const handlePromote = async (userId) => {
    const confirmPromote = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Do you want to promote this user?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });

    if (confirmPromote.isConfirmed) {
      updateUserType(userId, 2);
    }
  };

  const handleDemote = async (userId) => {
    const confirmDemote = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to demote this user?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });
    if (confirmDemote.isConfirmed) {
      updateUserType(userId, 1);
    }
  };

  const handleBan = async (userId) => {
    const confirmBan = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you want to ban this user?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    });
    if (confirmBan.isConfirmed) {
      updateUserType(userId, 0);
    }
  };

  return (
    <>
      <UniversalNav />
      <Text fontSize={"4xl"}>Edit user permissions</Text>
      <TableContainer>
        <Table variant={"striped"} colorScheme="teal">
          <Thead border={"2px"}>
            <Tr>
              <Th maxW={"2vw"}>User ID</Th>
              <Th>Username</Th>
              <Th>User email</Th>
              <Th maxW={"5vw"}>User phone</Th>
              <Th maxW={"2vw"}>User type</Th>
              <Th>Created at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody border={"2px"}>
            {users.map((user) => (
              <Tr key={user.user_id}>
                <Td>{user.user_id}</Td>
                <Td>{user.username}</Td>
                <Td>{user.user_email}</Td>
                <Td>{user.user_phone}</Td>
                <Td>{user.user_type_id}</Td>
                <Td>{user.created_at}</Td>
                <Td>
                  <Button
                    colorScheme="green"
                    mr={2}
                    onClick={() => handlePromote(user.user_id)}
                  >
                    Set admin
                  </Button>
                  <Button
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleDemote(user.user_id)}
                  >
                    Set user
                  </Button>
                  <Button
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
                  </Button>
                  <Button
                    colorScheme="blackAlpha"
                    color={"white"}
                    mr={2}
                    onClick={() => handleBan(user.user_id)}
                  >
                    Ban
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminUsers;
