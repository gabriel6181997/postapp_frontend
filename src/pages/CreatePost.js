import "../App.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";

export const CreatePost = () => {
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!authState.status) {
      history.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then(() => {
      history.push("/");
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            type="text"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />

          <Field
            id="inputCreatePost"
            type="text"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />

          <Field
            id="inputCreatePost"
            type="text"
            name="username"
            placeholder="(Ex. john123...)"
          />
          <button type="submit">Create a Post</button>
        </Form>
      </Formik>
    </div>
  );
};
