import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Context/auth';
import {UserDataContext} from '../Context/userData';

const useGetAllPosts = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('inside get All');
  const getPosts = useCallback(() => {
    console.log('get Posts triggered');
    firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allPosts = [];

        querySnapshot.forEach(documentSnapshot => {
          allPosts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPosts(allPosts);
        setLoading(false);
      });
  }, []);

  const memoPosts = React.useMemo(() => posts, [posts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 300);
  }, []);

  useEffect(() => {
    console.log('use Effect triggered');
    getPosts();
  }, [getPosts]);

  return [memoPosts, onRefresh, refreshing, loading];
};

export default useGetAllPosts;
