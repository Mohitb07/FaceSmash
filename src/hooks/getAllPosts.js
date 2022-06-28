import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {UserDataContext} from '../Context/userData';

const useGetAllPosts = () => {
  const {contextUser} = useContext(UserDataContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLatestPosts = () => {
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
  };

  useEffect(() => {
    const subscriber = firestore()
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

    return () => subscriber();
  }, [contextUser]);

  return [posts, loading, contextUser, getLatestPosts, setPosts, setLoading];
};

export default useGetAllPosts;
