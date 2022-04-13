import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import Score from "./Score";
import Comments from "./Comments";
import {CommentType} from "./Comments";
import {ScoreType} from "./Score";

export interface ServicesPropTypes {
  scores: ScoreType[],
  comments: CommentType[],
  scoreError: string|null,
  commentsError: string|null,
  onAddComment: () => void,
}

const Services = ({scores, comments, scoreError, commentsError, onAddComment}: ServicesPropTypes) => {

  return (
    <Tabs defaultActiveKey="score" id="services" className="mb-3">
      <Tab eventKey="score" title="Score">
        { !scoreError ? <Score scores={scores}/> : <div className="alert alert-danger" role="alert">{scoreError}</div> }
      </Tab>
      <Tab eventKey="comments" title="Comments">
        { !commentsError ? <Comments comments={comments} onAddComment={onAddComment}/> : <div className="alert alert-danger" role="alert">{commentsError}</div> }
      </Tab>
    </Tabs>
  );
}

export default Services;
