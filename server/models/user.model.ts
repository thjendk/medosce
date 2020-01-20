import { Model } from 'objection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const secret = process.env.SECRET || '';

interface User {
  userId: string;
  username: string;
  password: string;
  roleId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model {
  static tableName = 'users';
  static idColumn = 'userId';

  $beforeInsert() {
    this.createdAt = new Date();
    this.password = bcrypt.hashSync(this.password, 10);
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  verify(password: string) {
    return bcrypt.compare(password, this.password);
  }

  signToken() {
    const { userId, username, email, roleId } = this;

    return jwt.sign({ userId, username, email, roleId }, secret);
  }
}

export default User;
