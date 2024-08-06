import React, { Component } from "react";
import './Post.css';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="post_interno">
          <div className="post_header">
            <i className="post_avatar fa-solid fa-circle-user fa-3x"></i>
            <h3>{this.props.currentUsername || this.props.username}</h3>
          </div>

          <img className="post_image" alt={this.props.caption} src={this.props.imageSrc} />
          <i className="fa-regular fa-heart fa-2x"></i>
          <h4 className="post_descripcion"><strong>{this.props.caption}</strong></h4>
        </div>
      </div>
    );
  }
}

export default Post;