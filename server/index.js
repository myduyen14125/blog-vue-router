// index.js
// commonJS
const faker = require("faker");
module.exports = () => {
  const data = { blogs: [] };
  // Create 1000 users
  for (let i = 0; i < 20; i++) {
    data.blogs.push({
      id: i,
      title: faker.name.title(),
      description: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      thumbnail: faker.image.business(),
    });
  }
  return data;
};
