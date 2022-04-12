import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import Score from "./Score";
import Comments from "./Comments";
import {scoreService, commentService} from "../../../_api";

const Services = () => {
  const [scores, setScores] = useState([]);
  const [comments, setComments] = useState([]);
  const [scoreError, setScoreError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  const fetchData = () => {
    scoreService.fetchScores().then(
        response => setScores(response.data),
        error => { setScoreError(error?.message); setScores([]); });
    commentService.fetchComments().then(
      response => setComments(response.data),
      error => { setCommentsError(error?.message); setComments([]); });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs defaultActiveKey="score" id="services" className="mb-3">
      <Tab eventKey="score" title="Score">
        { !scoreError ? <Score scores={scores}/> : <div className="alert alert-danger" role="alert">{scoreError}</div> }
      </Tab>
      <Tab eventKey="comments" title="Comments">
        { !commentsError ? <Comments comments={comments}/> : <div className="alert alert-danger" role="alert">{commentsError}</div> }
      </Tab>
    </Tabs>
  );
}

export default Services;
