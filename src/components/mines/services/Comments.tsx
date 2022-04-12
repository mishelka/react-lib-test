import React from 'react';
import Table from "react-bootstrap/Table";
import {Routes, Route, Link} from "react-router-dom";
import { useForm } from 'react-hook-form';

export interface CommentType {
  ident: number,
  comment: string,
  game: string,
  commentedAt: number,
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
  required: {value: true, message: "Please write a comment message."},
  minLength: {value: 10, message: "You need to write at least 10 characters."},
  maxLength: {value: 50, message: "Maximum is 50 characters."}
}
const AddComment = () => {
  const {register, handleSubmit, formState: { errors, isValid }} = useForm<FormData>();
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(isValid);
    console.log(errors);
    // await commentService.addComment(data);
  };

  return (
    <div className="container">
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit((data: any) => onSubmit(data))}>
        <label htmlFor="comment">Comment message:</label>
        <textarea {...register("comment", formDataValidation)}
                  placeholder="Please write your comment here" />
        {/*<p>{data.message}</p>*/}
        <div><small style={{color: "red"}}>{errors && true}</small></div>
        <button type="submit">Send</button>
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
      <Link className="btn btn-primary" style={{margin: "0.5rem"}} to="/mines">Add Comment</Link>
    </div>
  );
};

export default Comments;
