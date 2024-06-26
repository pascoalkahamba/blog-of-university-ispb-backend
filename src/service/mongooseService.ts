import { modalUniversityDataSchema } from "../model/universityDataSchema";

export default class MongooseService {
  async create() {
    const posted = await modalUniversityDataSchema.create({});
  }
}
