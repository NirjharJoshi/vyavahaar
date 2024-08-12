import { constants } from "../utils/helper";

export function initDB() {
  if (!getItemObj(constants.users)) {
    setItemObj(constants.users, [
      {
        id: "aa51ecc4-5a50-417a-ab6c-71960bc4d661",
        username: "Manish",
        email: "test@test.com",
        password: "1234",
        likedPosts: ["97da88e4-8ef5-4527-a025-f3bc0d13e413"],
        urlIdentifier: "78",
        mainUrl: "https://randomuser.me/api/portraits/men/78.jpg",
        thumbUrl: "https://randomuser.me/api/portraits/thumb/men/78.jpg",
      },
      {
        id: "17d48817-9af5-40c9-9673-b27116005269",
        username: "Ram",
        email: "ram@gmail.com",
        password: "1234",
        likedPosts: [
          "97da88e4-8ef5-4527-a025-f3bc0d13e413",
          "97030155-77d4-479c-881e-63724db9396f",
          "58e9a96d-6c4b-4692-bba0-525c4ed1e2ab",
        ],
        urlIdentifier: "12",
        mainUrl: "https://randomuser.me/api/portraits/men/12.jpg",
        thumbUrl: "https://randomuser.me/api/portraits/thumb/men/12.jpg",
      },
    ]);
  }
  if (!getItemObj(constants.posts)) {
    setItemObj(constants.posts, [
      {
        id: "97da88e4-8ef5-4527-a025-f3bc0d13e413",
        userId: "aa51ecc4-5a50-417a-ab6c-71960bc4d661",
        createdBy: "Manish",
        createdAt: 1723448572104,
        imageUrl:
          "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
        description: "This burger is awesome 😘",
        like: 2,
        comments: [
          {
            id: "a0fa69db-907a-4d4d-9c13-ba2cb88b1615",
            userId: "aa51ecc4-5a50-417a-ab6c-71960bc4d661",
            username: "Manish",
            comment: "This is completely mouthwatering....",
          },
        ],
      },
      {
        id: "97030155-77d4-479c-881e-63724db9396f",
        userId: "aa51ecc4-5a50-417a-ab6c-71960bc4d661",
        createdBy: "Manish",
        createdAt: 1723450248352,
        imageUrl:
          "https://b.zmtcdn.com/data/pictures/9/18419689/2361dda7e983d16a0279b0defb485cbd.jpg",
        description:
          "How many of you tried south indian dishes... if not then do try this one... 🥇",
        like: 1,
        comments: [
          {
            id: "86d091b4-b306-4014-b1ba-57b084ad1707",
            userId: "17d48817-9af5-40c9-9673-b27116005269",
            username: "Ram",
            comment:
              "Hey manish I tried it and yes guys this dish is awesome 👍",
          },
        ],
      },
      {
        id: "58e9a96d-6c4b-4692-bba0-525c4ed1e2ab",
        userId: "17d48817-9af5-40c9-9673-b27116005269",
        createdBy: "Ram",
        createdAt: 1723450405714,
        imageUrl:
          "https://images.freeimages.com/images/large-previews/2b6/food-18-1323940.jpg?fmt=webp&w=500",
        description: "french fries is love... share your thoughts...🤔",
        like: 1,
        comments: [],
      },
    ]);
  }
}

export function getItemObj(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setItemObj(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
