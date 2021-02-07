import './PhotosPage.css';
import React, { Component } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faPlus,faShare,faInfoCircle,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

class PhotoEngine extends Component {
    componentDidMount() {
        this.setState({ data:this.props.data,title:this.props.searchValue});
    }

    state = {
        searchValue:"",
        title:"",
        apiKey:"3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4",
        data:null,
        error:null,
        showedPhoto:null
      }

  valueChangedHandler= (event) =>{
  this.setState({ searchValue:event.target.value});
  this.fetchNewHints();
  }

  fetchNewHints= (text)=>{
    if(text.length>2)
    {
      axios.get('https://unsplash.com/nautocomplete/'+text)
      .then(response => {
        // 
        console.log(response);
      })
      .catch(error => {
        this.setState({ error:error});
          console.log(error);
      });
    }
  }
  fetchOnePhoto = (id) => {
        axios.get('https://api.unsplash.com/photos/'+id+'?client_id=3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4')
        .then(response => {
          this.setState({ showedPhoto:response});
        })
        .catch(error => {
          this.setState({ error:error});
          console.log(error);
        });
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
    console.log(this.state.showedPhoto)
    let photos;
    if(this.state.data)
    {
      photos = (
        <section className="photoGrid">
          {this.state.data.data.results.map(photo => (
          <div className="photo" key={photo.id}><img onClick={() => this.fetchOnePhoto(photo.id)} src={photo.urls.regular} alt={photo.alt_description} />
          <ul className="photoTag">
          {photo.tags.map((littleTag,index) => (

            (littleTag.source ? <li key={index}>{littleTag.source.title}</li> : <li key={index}>{littleTag.title}</li>)
          ))}
          </ul>
          </div>
      ))}</section>      
    );
    }
    let showingPhoto;
    if(this.state.showedPhoto)
    {
      showingPhoto=(
        <div className="blackOverlay"  onClick={() => this.setState({ showedPhoto:null})}>
          <div className="photoModal">
            <div className="photoModalTopBar">
              <div className="leftText">
              <img src={this.state.showedPhoto.data.user.profile_image.small} alt="username thumbnail"/>
               <div className="name"> <p className="fullname">{this.state.showedPhoto.data.user.name}</p>
                <p className="username">@{this.state.showedPhoto.data.user.username}</p></div>
              </div>
              <div>
                <button className="like">
                <FontAwesomeIcon icon={faHeart}/>
                </button>
                <button className="add"><FontAwesomeIcon icon={faPlus}/>
                </button>
              </div>
            </div>
            <img className="mainPhoto" src={this.state.showedPhoto.data.urls.full} alt={this.state.showedPhoto.data.alt_description}/>
            <div className="photoModalBottomBar">
            <div className="leftText">
               <div className="localisation">
                 <p><FontAwesomeIcon icon={faMapMarkerAlt}/>{this.state.showedPhoto.data.location.name}</p>
                 </div>
              </div>
              <div>
                <button className="share">
                <FontAwesomeIcon icon={faShare}/>Share
                </button>
                <button className="info"><FontAwesomeIcon icon={faInfoCircle}/>Info
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
        <section className="photosPage" >
        <div className="searchBar"><i className="material-icons mdc-button__icon" onClick={this.fetchPhotos}>search</i><input onKeyDown={this.checkEnter} type="text" id="searchPhotoPage" name="searchPhotoPage" placeholder="Search free high-resolution photos" onChange={this.valueChangedHandler}></input></div>
        <h1>{this.state.title}</h1>
        <ul className="topSearchTags"><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li><li>Lorem</li></ul>
        {photos}
        {showingPhoto}
        </section>
    );
  }
}

export default PhotoEngine;
