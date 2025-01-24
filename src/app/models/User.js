class User {
  constructor({ name, email, id }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // Method to create a new user instance
  static create({ name, email }) {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    return new User({ name, email });
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
