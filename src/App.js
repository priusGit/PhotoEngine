import './App.css';
import React, { Component } from 'react';
import axios from 'axios'
import PhotosPage from './PhotosPage/PhotosPage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
class PhotoEngine extends Component {
  state = {
    searchValue:"",
    apiKey:"3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4",
    responded:false,
    data:null,
    error:null,
    suggestions:null,
    photoIds:null
  }

  valueChangedHandler= (event) =>{
  this.setState({ searchValue:event.target.value},this.fetchNewHints(event.target.value));
  }

  fetchNewHints= (text)=>{
    //CORS Problem, nie działa i nie będzie, chyba że mi odpowiedzą w poniedziałek/ wtorek jak sie z tego właściwie korzysta
    if(text.length>2)
    {
      axios.get('https://unsplash.com/nautocomplete/'+text)
      .then(response => {
          this.setState({ suggestions:response.data,error:null});
      })
      .catch(error => {
        this.setState({ error:error});
          console.log(error);
      });
    }
  }

  fetchPhotos = () =>{
    let idsArray=[];
    if(this.state.searchValue)
    {
      axios.get('https://api.unsplash.com/search/photos?per_page=20&client_id=3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4&query='+this.state.searchValue)
      .then(response => {
        response.data.results.map((photo,index) => (
            idsArray[index]=photo.id
        ))
        this.setState({ data:response,responded:true,error:null,photoIds:idsArray});
        })
      .catch(error => {
        this.setState({ error:error});
          console.log(error);
      });
    }
}
onXclick = () => {
  document.getElementById("searchSearchPage").value=""; 
  document.getElementById("searchSearchPage").focus();
  this.setState({searchValue:null});
}
fetchPhotosFromSuggestion = (query) => {
  this.setState({ searchValue:query},this.fetchPhotos); 
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
      let suggest;
    if(this.state.suggestions)
    {
      if(this.state.suggestions.did_you_mean.length>0)
      {
        if(this.state.searchValue && this.state.searchValue.length>2)
        {
          suggest=(
            <div className="suggestions">
              <ul>
                {this.state.suggestions.did_you_mean.map(suggestion => (
                  <li key={suggestion.query} onClick={() => this.fetchPhotosFromSuggestion(suggestion.query)}>{suggestion.query}</li>
                ))}
              </ul>
            </div>
          );
        }
      }
    else      
      {
           if(this.state.searchValue && this.state.searchValue.length>2)
           {
            suggest=(
              <div className="suggestions">
                <ul>
                   <li>No coresponding tags found</li>
                </ul>
              </div>
            );
           }
           else{
             suggest=null;
           }
      }
    }
    
    let xSign=null;
      if(document.getElementById("searchSearchPage"))
      {
        document.getElementById("searchSearchPage").value.length !==0 ? xSign = <FontAwesomeIcon onClick={() => this.onXclick()} icon={faTimes}/> : xSign = null;
    }
      content = (
        <section className="mainPage">
          <div className="searchPage">
          <h1>Unsplash</h1>
          <p>The internet's source of  <a href="/">freely-usable images.</a></p>
          <p>Powered by creators everywhere.</p>
          <div className="searchBar"><i className="material-icons mdc-button__icon" onClick={this.fetchPhotos}>search</i><input onKeyDown={this.checkEnter} type="text" id="searchSearchPage" name="searchSearchPage" placeholder="Search free high-resolution photos" onChange={this.valueChangedHandler} autoComplete="off"></input>
          {xSign}</div>
          {suggest}
          <p className="trending">Trending: {trending}</p>
        </div>
        </section>
      );
    }
    else
    {
      content = (
      <PhotosPage data={this.state.data} searchValue={this.state.searchValue} photoIds={this.state.photoIds}/>
      );
    }
    return (
      <main>{content}</main>
    );
  }
}

export default PhotoEngine;
