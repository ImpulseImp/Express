import mongoose from 'mongoose';

export const connectDB = async (url: string) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log('connected to the db...');
    })
    .catch((err) => {
      console.log(err);
    });
};
