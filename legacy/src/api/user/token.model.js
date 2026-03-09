import mongoose, { Schema } from 'mongoose'

const userTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  }
}, {
  timestamps: true
})

const model = mongoose.model('UserToken', userTokenSchema)

export const schema = model.schema
export default model
