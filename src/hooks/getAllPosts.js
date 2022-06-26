import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {UserDataContext} from '../Context/userData';

const useGetAllPosts = () => {
  const {userData} = useContext(UserDataContext);
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
  }, [userData]);

  return [posts, loading, userData, getLatestPosts, setPosts, setLoading];
};

export default useGetAllPosts;
