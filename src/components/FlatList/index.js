import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import useGetAllPosts from '../../hooks/getAllPosts';
import Feed from '../Feed';
import PostHeader from '../PostHeader';

function CustomFlatList({navigation}) {
  const [memoPosts, onRefresh, refreshing, loading] = useGetAllPosts();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={memoPosts}
      keyExtractor={item => item.key}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (
        <PostHeader navigation={navigation} loading={loading} />
      )}
      renderItem={({item}) => (
        <Feed
          postId={item.key}
          userProfilePic={item.userProfile}
          createdAt={item.createdAt}
          username={item.username}
          postTitle={item.title}
          image={item.image}
          description={item.description}
          navigation={navigation}
          likes={item.likes}
          userId={item.user}
        />
      )}
    />
  );
}

export default React.memo(CustomFlatList);
