import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useComment = (td_id) => {
  const [cookies] = useCookies(['user']);
  const [comment, setComment] = useState({
    list: [],
    post: '',
    error: ''
  });

  useEffect(() => {
    axios.get(`/api/comments/${td_id}`)
      .then((res) => {
        setComment((prev) => {
          return {
            ...prev,
            list: [...res.data]}
        });
      });
  }, [td_id]);

  const postComment = function() {
    const date = new Date();
    if (comment.post === "") {
      setComment((prev) => { return { ...prev, error: "Comment cannot be blank"}});
      return;
    }
    if (!cookies.user) {
      setComment((prev) => { return { ...prev, error: "Need to login to comment"}});
      return;
    }

    const user_id = cookies.user.id;
    const sendComment = comment.post;

    axios.post(`/api/comments/`, { user_id, td_id, sendComment })
      .then(() => {
        setComment((prev) => {
          return {
            list: [...prev.list, {
              id: `comment${comment.list.length}n`,
              users_id: cookies.user.id,
              travel_destination_id: td_id,
              comment: prev.post,
              created_at: date.toISOString(),
              first_name: cookies.user.firstName,
              last_name: cookies.user.lastName,
            }],
            post: '',
            error: ''
          }
        })
      })
      .catch(error => console.log("Error"));
  }

  const setPost = function(new_commment) {
    setComment((prev) => {
      return {
        ...prev,
        post: new_commment
      }
    })
  };

  return { comment, postComment, setPost };
};

export default useComment;
