import './PhotosPage.css';
import React, { Component } from 'react';
import axios from 'axios'

class PhotoEngine extends Component {
    componentDidMount() {
        console.log(this.props.data);
        this.setState({ data:this.props.data,title:this.props.searchValue});
    }

    state = {
        searchValue:"",
        title:"",
        apiKey:"3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4",
        data:null,
        error:null
      }

  valueChangedHandler= (event) =>{
  this.setState({ searchValue:event.target.value});
  this.fetchNewHints();
  }

  fetchNewHints= ()=>{
    console.log("fetch new hints fired");
  }

  fetchPhotos = () =>{
      if(this.state.searchValue)
      {
        axios.get('https://api.unsplash.com/search/photos?client_id=3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4&query='+this.state.searchValue)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
      }
}
  render(){
    return (
        <section className="photosPage">
        <div className="searchBar"><i className="material-icons mdc-button__icon" onClick={this.fetchPhotos}>search</i><input type="text" id="searchPhotoPage" name="searchPhotoPage" placeholder="Search free high-resolution photos" onChange={this.valueChangedHandler}></input></div>
        <h1>{this.state.title}</h1>
        <ul><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li></ul>
        <section className="photoGrid">
            <img src="https://placekitten.com/293/366" alt="image1" />
            <img src="https://placekitten.com/354/335" alt="image1" />
            <img src="https://placekitten.com/336/394" alt="image1" />
            <img src="https://placekitten.com/293/366" alt="image1" />
            <img src="https://images.unsplash.com/photo-1514477917009-389c76a86b68?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="image1" />
            <img src="https://placekitten.com/336/394" alt="image1" />
            <img src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="image1" />
            <img src="https://placekitten.com/291/328" alt="image1" />
            <img src="https://www.w3schools.com/tags/img_girl.jpg" alt="image1" />
            <img src="https://placekitten.com/354/335" alt="image1" />
            <img src="https://www.w3schools.com/tags/img_girl.jpg" alt="image1" />
            <img src="https://placekitten.com/354/335" alt="image1" />
            <img src="https://www.w3schools.com/tags/img_girl.jpg" alt="image1" />
            <img src="https://images.unsplash.com/photo-1514477917009-389c76a86b68?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="image1" />
            <img src="https://placekitten.com/336/394" alt="image1" />
            <img src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="image1" />
            <img src="https://placekitten.com/291/328" alt="image1" />
            <img src="https://placekitten.com/293/366" alt="image1" />
        </section>
        </section>
    );
  }
}

export default PhotoEngine;
