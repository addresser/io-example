module.exports = (dbConnect) => {

  const Schema = dbConnect.Schema;

  let MessageSchema = new Schema({
    content: String,
    created_at: Date,
  });

  MessageSchema.pre('save', function(next)  {
    this.created_at = new Date;

    next();
  });

  return dbConnect.model('Message', MessageSchema);
};

