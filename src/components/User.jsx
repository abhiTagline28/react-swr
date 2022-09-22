import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Button, Table } from "reactstrap";
import { useDispatch } from "react-redux";
import { editUserAction } from "../store/actions/app";
import ConformationModal from "./ConformationModal";
import { handleToast } from "../utils/customFunction";
import { useEffect } from "react";
import Loader from "./Loader";
import { equal } from "../utils/javascript";

const User = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    isDelete: false,
    userId: "",
  });

  const { errorMsg, successMsg } = handleToast();

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("http://localhost:4000/users", fetcher, {
    // compare: (_old, _new) => {
    //   return equal(_old, _new);
    // },
  });

  const editUser = (userId) => {
    console.log("userId :>> ", userId);

    const res = data.find((user) => user.id === userId);
    if (res) {
      dispatch(editUserAction(res));
    }
    console.log("res", res);
  };

  const cancelModal = () => {
    setUserInfo({
      ...userInfo,
      isDelete: false,
    });
  };

  const deleteUser = () => {
    console.log("userInfo :>> ", userInfo);
    axios.delete(`http://localhost:4000/users/${userInfo.userId}`).then(
      (response) => {
        if (response.status === 200) {
          successMsg("User added successfully");
          setUserInfo({
            isDelete: false,
            userId: "",
          });
        }
      },
      (error) => {
        console.log(error);
        errorMsg(error.message || error || "Something went wrong");
      }
    );
  };

  useEffect(() => {
    if (error) {
      errorMsg(error.message || "Something went wrong");
    }
  }, [error]);

  return (
    <>
      <h1>Users</h1>
      <Table style={{ width: "700px", margin: "auto" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.length ? (
            data.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.address}</td>
                  <td>{item?.phone}</td>
                  <td>
                    <Button color="info" onClick={() => editUser(item.id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() =>
                        setUserInfo({
                          ...userInfo,
                          isDelete: true,
                          userId: item.id,
                        })
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h3>No data found</h3>
          )}
        </tbody>
      </Table>
      <ConformationModal
        title="Delete User"
        modal={userInfo?.isDelete}
        cancelModal={cancelModal}
        toggle={deleteUser}
        msg="delete user?"
      />

      {/* {isValidating && <Loader />} */}
    </>
  );
};

export default User;
