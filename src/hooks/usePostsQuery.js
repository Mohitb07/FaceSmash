import React, {useCallback, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {postState} from '../atoms/postAtom';
import {useRecoilState} from 'recoil';

const LIMIT = 5;

const usePostsQuery = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);

  const getPosts = useCallback(async () => {
    setPostStateValue(prev => ({
      ...prev,
      posts: [],
    }));
    try {
      const allPosts = await firestore()
        .collection('Posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get();

      const latestPost = [];
      allPosts.docs.map(item => {
        latestPost.push({
          ...item.data(),
          key: item.id,
        });
      });

      let lastVisibleDoc = allPosts.docs[allPosts.docs.length - 1];

      setPostStateValue(prev => ({
        ...prev,
        posts: latestPost,
      }));

      setLastVisible(lastVisibleDoc);
      setLoading(false);
    } catch (error) {
      console.log('getPosts error', error);
      setLoading(false);
    }
  }, []);

  return {
    postStateValue,
    loading,
    lastVisible,
    getPosts,
    setPostStateValue,
    setLoading,
    setLastVisible,
  };
};

export default usePostsQuery;
