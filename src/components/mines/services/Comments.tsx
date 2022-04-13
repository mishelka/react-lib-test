import React from 'react';
import Table from "react-bootstrap/Table";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {commentService} from "../../../_api";

export interface CommentType {
  ident?: number,
  comment: string,
  game: string,
  commentedAt: string,
  player: string,
}

export interface CommentsPropTypes {
  comments: CommentType[],
}

const Comments = ({comments} : CommentsPropTypes) => (
  <React.Fragment>
    <Routes>
      <Route path={`addComment`} element={<AddComment/>}/>
      <Route index element={<CommentsTable comments={comments}/>}/>
    </Routes>
  </React.Fragment>
);

type FormData = {
  comment: string;
}
const formDataValidation = {
  required: "Please write a comment message.",
  minLength: {value: 10, message: "Please write at least 10 characters."},
  maxLength: {value: 250, message: "Maximum is 250 characters."}
}

const AddComment = () => {
  const {register, handleSubmit, formState: { errors, isValid }} = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    if(isValid) {
      await commentService.addComment(data.comment);
      navigate("");
    }
  };

  return (
    <div className="container">
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit((data: any) => onSubmit(data))}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <label htmlFor="comment">Comment message:</label>
          <textarea {...register("comment", formDataValidation)}
                    placeholder="Please write your comment here" />
        </div>
        <div><small style={{color: "red"}}>{errors?.comment?.message}</small></div>
        <div className="button-container">
          <Link to="/" className="button">Back</Link>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

const CommentsTable = ({comments} : CommentsPropTypes) => {
  return (
    <div className="container">
      <h1>Comments</h1>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Player</th>
          <th>Comment</th>
          <th>Commented At</th>
        </tr>
        </thead>
        <tbody>
        { comments.map((comment) => (
          <tr key={comment.ident}>
            <td>{comment.player}</td>
            <td>{comment.comment}</td>
            <td>{new Date(comment.commentedAt).toLocaleString()}</td>
          </tr>
        )) }
        </tbody>
      </Table>
      <Link className="btn btn-primary" style={{margin: "0.5rem"}} to="addComment">Add Comment</Link>
    </div>
  );
};

export default Comments;
