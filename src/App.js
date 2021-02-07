import './App.css';
import React, { Component } from 'react';
import axios from 'axios'
import PhotosPage from './PhotosPage/PhotosPage'
class PhotoEngine extends Component {
  state = {
    searchValue:"",
    apiKey:"3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4",
    responded:false,
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
        this.setState({ data:response,responded:true,error:null});
      })
      .catch(error => {
        this.setState({ error:error});
          console.log(error);
      });
    }
}

checkEnter = e => {
  if (e.keyCode === 13) {
    this.fetchPhotos();
  }
};

  render(){
    let content;
    let trending ="flower, wallpapers, backgrounds, happy, love";
    if(!this.state.responded)
    {
      content = (
        <section className="mainPage">
          <div className="searchPage">
          <h1>Unsplash</h1>
          <p>The internet's source of  <a href="/">freely-usable images.</a></p>
          <p>Powered by creators everywhere.</p>
          <div className="searchBar"><i className="material-icons mdc-button__icon" onClick={this.fetchPhotos}>search</i><input onKeyDown={this.checkEnter} type="text" id="searchSearchPage" name="searchSearchPage" placeholder="Search free high-resolution photos" onChange={this.valueChangedHandler}></input></div>
          <p>Trending: {trending}</p>
        </div>
        </section>
      );
    }
    else
    {
      content = (
      <PhotosPage data={this.state.data} searchValue={this.state.searchValue}/>
      );
    }
    return (
      <main>{content}</main>
    );
  }
}

export default PhotoEngine;
