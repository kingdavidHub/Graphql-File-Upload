export default {
  Query: {
    hello: () => "hi"
  },
  Mutation: {
    uploadFile: (parent, { file }) => {
      console.log(file);
      // ! do whatever you want here and can save it to the database
      // !but remeber the image uploading on the forntend is not being compressed
      return true;
    }
  }
};
