import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/chOneDB";

export const dbConfig = async () => {
  try {
    return await connect(URL).then(() => {
      console.log("DB Connected ");
    });
  } catch (error: any) {
    return error;
  }
};
