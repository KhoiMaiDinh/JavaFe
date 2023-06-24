import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { useGetSavedUserMutation } from '../features/pin/pinApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useGetCommentMutation, usePostCommentMutation } from '../features/comment/commentApiSlice';

const PinDetail = () => {
  const { pinId } = useParams();
  const { state } = useLocation();
  const user = useSelector(selectCurrentUser)
  const postedBy = state.user
  
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState(state.pin);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const [postComment] = usePostCommentMutation();
  const [getComment] = useGetCommentMutation();

  const addComment = async () => {
    if (comment) {
      // console.log({comment});
      setAddingComment(true);
      try{
        postComment({user: user.id, comment: comment, pinId: pinId}).unwrap()
        .then((response)=>{
          console.log({response});
          setAddingComment(false);
          setComment('');
          setCommentArray([...commentArray, {comment: response, user: user}])
        });
        
      }
      catch(error){
        console.log(error);
        
      }
     
      
    }
  };

  useEffect(() => {
    console.log(pinId)
    try{
      getComment({pinId: pinId}).then(response => {
        console.log(response)
        const comments = response.data;
        setCommentArray([...comments]);
      });
      console.log({commentArray});
    }
    catch(error){
      console.log(error);
    }
  }, []);

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.image)}

              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              {/* <p className="mt-3">{pinDetail.about}</p> */}
            </div>
            <Link to={`/user-profile/${pinDetail?.userId}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={postedBy?.avatarUrl} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{postedBy?.firstname + ' ' + postedBy?.lastname}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {commentArray.length && commentArray.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment.id}>
                  <Link to={`/user-profile/${item?.user?.id}`} >
                    <img
                      src={item?.user?.avatarUrl}
                      className="w-10 h-10 rounded-full cursor-pointer"
                      alt="user-profile"
                    />
                  </Link>
                  
                  <div className="flex flex-col">
                    <p className="font-bold">{item.user?.firstname + ' ' + item.user?.lastname}</p>
                    <p>{item.comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user.id}`}>
                <img src={user.avatarUrl} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )} */}
    </>
  );
};

export default PinDetail;