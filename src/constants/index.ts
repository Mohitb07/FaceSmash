import theme, {COLORS, SIZES, FONTS} from './theme'

export {theme, COLORS, SIZES, FONTS}

export const DEFAULT_PROFILE_PIC =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3eLpTAMWO-mtILepXLwg68-IChyGcXJgog&usqp=CAU'

export const FEED_LIMIT = 5
export const USERS_LIMIT = 5

export const DEFAULT_USER_DETAILS = {
  bio: '',
  createdAt: '',
  email: '',
  followers: [],
  followings: [],
  key: '',
  lastSignIn: '',
  profilePic: '',
  qusername: '',
  uid: '',
  username: '',
}

export const USERS_COLLECTION = 'Users'
export const POSTS_COLLECTION = 'Posts'

export const DUMMY_STORY_DATA = [
  {
    uri: 'https://media.istockphoto.com/photos/portrait-of-a-young-african-man-at-studio-high-fashion-male-model-in-picture-id1325359218?b=1&k=20&m=1325359218&s=170667a&w=0&h=MflA10Erq46yR-LFSREN6svtgXP7OeKuiBGXkYnBWls=',
    username: 'Drax',
    id: 1,
  },
  {
    uri: 'https://avatarfiles.alphacoders.com/109/109358.jpg',
    username: 'Alexandra Daddario',
    id: 2,
  },
  {
    uri: 'https://pbs.twimg.com/profile_images/1383196364792680448/N8CdupEu_400x400.jpg',
    username: 'Amber',
    id: 3,
  },
  {
    uri: 'https://vz.cnwimg.com/wp-content/uploads/2010/02/Emma-Watson.jpg',
    username: 'Emma Watson',
    id: 4,
  },
  {
    uri: 'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFrZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    username: 'Jennie',
    id: 5,
  },
  {
    uri: 'https://www.udiscovermusic.com/wp-content/uploads/2020/06/Justin-Bieber-GettyImages-472253196-1000x600.jpg',
    username: 'Justin Bieber',
    id: 6,
  },
]
export const STORY_DATA = [
  {
    user_id: 1,
    user_image: DUMMY_STORY_DATA[0].uri,
    user_name: DUMMY_STORY_DATA[0].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://compote.slate.com/images/6c3b82cd-7910-4d13-842d-ebc0ca0718bd.jpeg?crop=1560%2C1040%2Cx0%2Cy0',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://images.unsplash.com/photo-1506634572416-48cdfe530110?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmxhY2slMjBtYWxlJTIwbW9kZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
      },
    ],
  },
  {
    user_id: 2,
    user_image: DUMMY_STORY_DATA[1].uri,
    user_name: DUMMY_STORY_DATA[1].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://1.bp.blogspot.com/-0yo1zC_FbHo/X01UsK4IfZI/AAAAAAABgZQ/hJAOXdo8plQQd9oPJ1C4mgNCqfUFk-EogCLcBGAsYHQ/s1600/7-Alexandra%2BDaddario%2Bpictures%2Band%2Bphotos%2B%252819%2529.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://imageio.forbes.com/specials-images/imageserve/61e369cb959199c9d1b0f30d/Alexandra-Daddario/0x0.jpg?format=jpg&crop=1683,1684,x0,y346,safe&width=960',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 3,
    user_image: DUMMY_STORY_DATA[2].uri,
    user_name: DUMMY_STORY_DATA[2].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://www.pinkvilla.com/imageresize/amber_heard_aquaman_role_0.jpg?width=752&format=webp&t=pvorg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 4,
    user_image: DUMMY_STORY_DATA[3].uri,
    user_name: DUMMY_STORY_DATA[3].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://www.greenqueen.com.hk/wp-content/uploads/2020/06/emma-watson-Gettyimages-Karwai-Tang-.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 5,
    user_image: DUMMY_STORY_DATA[4].uri,
    user_name: DUMMY_STORY_DATA[4].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmFrZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
  {
    user_id: 6,
    user_image: DUMMY_STORY_DATA[5].uri,
    user_name: DUMMY_STORY_DATA[5].username,
    stories: [
      {
        story_id: 1,
        story_image:
          'https://media.newyorker.com/photos/5e2b598351d1330009001749/master/w_2560%2Cc_limit/Fry-JustinBieberDocuseries.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
    ],
  },
]
