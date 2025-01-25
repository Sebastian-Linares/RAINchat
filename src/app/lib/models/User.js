class User {
  constructor({ name, email, id, monthlyDuration }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.monthlyDuration = monthlyDuration;
  }

  static fromJson(json) {
    return new User(json);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      monthlyDuration: this.monthlyDuration,
    };
  }
}

export default User;
