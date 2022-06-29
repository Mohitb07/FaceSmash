import firestore from '@react-native-firebase/firestore';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../Context/auth';
import {UserDataContext} from '../Context/userData';

const useGetAllPosts = () => {
  console.log('inside useGetAllPosts');
  const {contextUser} = useContext(UserDataContext);
  const {authUser} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLatestPosts = () => {
    if (authUser) {
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
    }
  };

  let sub;
  useEffect(() => {
    if (authUser) {
      sub = firestore()
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
    }

    return () => sub();
  }, []);

  return [posts, loading, contextUser, getLatestPosts, setPosts, setLoading];
};

export default useGetAllPosts;
