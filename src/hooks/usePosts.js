import React from 'react';

import {useCallback, useContext, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import firestore from '@react-native-firebase/firestore';

import {authState} from '../atoms/authAtom';
import {postState} from '../atoms/postAtom';

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [authUser, setAuthUser] = useRecoilState(authState);

  const onPostLike = (postId, post) => {
    const existingLike = postStateValue.postLikes.find(
      item => item.postId === postId,
    );

    let updatedPostLiked = [...postStateValue.postLikes];
    const updatedPosts = [...postStateValue.posts];
    const toBeUpdatedPost = [{...post}];

    const batch = firestore().batch();

    try {
      if (!existingLike) {
        const userDocument = firestore()
          .collection('Users')
          .doc(authUser.uid)
          .collection(`postlikes`)
          .doc(postId);

        batch.set(userDocument, {
          postId: postId,
        });
        const postRef = firestore().collection('Posts').doc(postId);

        batch.update(postRef, {
          likes: firestore.FieldValue.increment(1),
        });

        toBeUpdatedPost[0].likes++;
        setPostStateValue(prev => {
          return {
            ...prev,
            posts: updatedPosts.map(
              item => toBeUpdatedPost.find(o => o.key === item.key) || item,
            ),
            postLikes: [...updatedPostLiked, {postId: postId}],
          };
        });
      } else {
        const userDocument = firestore()
          .collection('Users')
          .doc(authUser.uid)
          .collection('postlikes')
          .doc(postId);

        batch.delete(userDocument);

        const postRef = firestore().collection('Posts').doc(postId);

        batch.update(postRef, {
          likes: firestore.FieldValue.increment(-1),
        });

        toBeUpdatedPost[0].likes--;

        // setPostStateValue(prev => ({
        //   ...prev,
        //   postLikes: postStateValue.postLikes.filter(
        //     item => item.postId !== postId,
        //   ),
        // }));

        setPostStateValue(prev => {
          return {
            ...prev,
            posts: updatedPosts.map(
              item => toBeUpdatedPost.find(o => o.key === item.key) || item,
            ),
            postLikes: postStateValue.postLikes.filter(
              item => item.postId !== postId,
            ),
          };
        });
      }
      batch.commit(() => {
        console.log('batch ops completed');
      });
    } catch (err) {
      console.log('onpostlike error', err.message);
    }
  };

  const onPostDelete = () => {};
  const onPostUpdate = () => {};

  return [onPostLike];
};

export default usePosts;
