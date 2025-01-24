class User {
  constructor({ name, email, id }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromJson(json) {
    return new User(json);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}

export default User;
