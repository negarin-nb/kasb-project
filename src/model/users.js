const Users = [
  {
    id: 1,
    email: "user1@email.com",
    username: "user1",
    password: "password",
    token: "token123",
    cash: 5450000
  },
  {
    id: 2,
    email: "user2@email.com",
    username: "user2",
    password: "pass1234",
    token: "token12345",
    cash: 5450000
  },
  {
    id: 3,
    email: "testuser@email.com",
    username: "testuser",
    password: "testpass",
    token: "testtoken",
    cash: 5450000
  },
];

export function getUsers() {
  return Users;
};

export function getUser(id) {
  return Users.find(m => m._id === id);
};


export function addUser(newUser) {
 // Users=[... newUser];
  Users.push(newUser);
};
