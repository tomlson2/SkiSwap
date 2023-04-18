import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/users', this.state)
      .then(response => {
        console.log(response);
        // TODO: Handle successful form submission
      })
      .catch(error => {
        console.log(error);
        // TODO: Handle error
      });
  }

  render() {
    return (
      <div>
        <h1>Sign up for Tasky</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
