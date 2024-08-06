import React, { Component} from "react";
import './Post.css';


class Post extends Component {
    render(){
        return(
            <div className="post">'
               <div className="post_interno">
                <div className="post_header">
                    <i className="post_avatar" class="fa-solid fa-circle-user fa-4x"></i>
                    <h3>Username</h3>
                </div>

                <img className = "post_image" alt= "Random" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR37Y1m_hI9VvbUKHazJ2j61AJ5CcZGVWHM9A&s" />

                <h4 className="post_descripcion"><strong>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</strong></h4>
              </div>
            </div>

     );
    }
}

export default Post;