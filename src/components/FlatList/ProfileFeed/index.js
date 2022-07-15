import firestore from '@react-native-firebase/firestore';
import {Text as NText} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {COLORS} from '../../../constants';
import useLikedPosts from '../../../hooks/useLikedPosts';
import Feed from '../../Feed';
import FeedSkeleton from '../../FeedSkeleton';
import ProfileHeader from '../../Header/Profile';

const ProfileFeed = ({userId, navigation}) => {
  const {userLikedPosts} = useLikedPosts();
  const [myRecentPosts, setMyRecentPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection('Posts')
      .where('user', '==', userId)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        const allRecentPosts = [];
        querySnapshot.forEach(doc => {
          allRecentPosts.push({
            ...doc.data(),
            key: doc.id,
          });
        });

        setMyRecentPosts(allRecentPosts);
        setLoading(false);
      });
  }, []);

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 20}}
      data={myRecentPosts}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() =>
        loading ? (
          <FeedSkeleton />
        ) : (
          <NText
            textAlign="center"
            color={COLORS.white}
            fontSize={20}
            marginTop={20}>
            Not Enough Posts
          </NText>
        )
      }
      keyExtractor={item => item.key}
      ListHeaderComponent={
        <ProfileHeader
          userId={userId}
          navigation={navigation}
          totalPosts={myRecentPosts?.length}
        />
      }
      renderItem={({item}) => (
        <Feed
          postId={item.key}
          userProfilePic={item?.userProfile}
          createdAt={item.createdAt}
          username={item.username}
          postTitle={item.title}
          image={item.image}
          description={item.description}
          navigation={navigation}
          likes={myRecentPosts.find(post => post.key === item.key)?.likes}
          userId={item.user}
          hasLiked={
            userLikedPosts.find(post => post.postId === item.key)?.liked
          }
        />
      )}
    />
  );
};

export default ProfileFeed;
