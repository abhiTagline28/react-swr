import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { handleToast } from "../utils/customFunction";
import { useDispatch, useSelector } from "react-redux";
import { keys, length } from "../utils/javascript";
import { editUserAction } from "../store/actions/app";

const UserForm = () => {
  const initialState = {
    name: "",
    email: "",
    address: "",
    phone: "",
  };

  const [user, setUser] = useState(initialState);
  const [manageUser, setManageUser] = useState({
    isEdit: false,
  });
  const userDetail = useSelector((state) => state.app.edit_user);

  const { name, email, address, phone } = user;

  const dispatch = useDispatch();

  const { errorMsg, successMsg } = handleToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (manageUser?.isEdit) {
      axios.put(`http://localhost:4000/users/${userDetail?.id}`, user).then(
        (response) => {
          if (response.status === 200) {
            successMsg("User updated successfully");
            setUser(initialState);
            dispatch(editUserAction({}));
          }
        },
        (error) => {
          console.log(error);
          errorMsg(error.message || error || "Something went wrong");
        }
      );
    } else {
      axios.post("http://localhost:4000/users", user).then(
        (response) => {
          if (response.status === 201) {
            successMsg("User added successfully");
            setUser(initialState);
            setManageUser({
              ...manageUser,
              isEdit: false,
            });
          }
        },
        (error) => {
          console.log(error);
          errorMsg(error.message || error || "Something went wrong");
        }
      );
    }
  };

  useEffect(() => {
    if (userDetail && length(keys(userDetail))) {
      setUser({
        ...user,
        name: userDetail?.name,
        email: userDetail?.email,
        address: userDetail?.address,
        phone: userDetail?.phone,
      });
      setManageUser({
        ...manageUser,
        isEdit: true,
      });
    }
  }, [userDetail]);

  return (
    <>
      <h1>Add User</h1>
      <Form style={{ width: "700px", margin: "auto" }}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Enter Name"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Email</Label>
              <Input
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter Email"
                type="email"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input
                id="address"
                name="address"
                value={user.address}
                onChange={handleChange}
                placeholder="Enter Address"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleAddress2">Phone No.</Label>
              <Input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter Phone N."
              />
            </FormGroup>
          </Col>
        </Row>

        <Button
          color="primary"
          disabled={!name || !email || !address || !phone}
          onClick={handleSubmit}
        >
          {manageUser?.isEdit ? "Edit" : "Add"} User
        </Button>
      </Form>
    </>
  );
};

export default UserForm;
