import './PhotosPage.css';
import React, { Component } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faPlus,faShare,faInfoCircle,faMapMarkerAlt,faChevronRight,faChevronLeft,faTimes } from '@fortawesome/free-solid-svg-icons'

class PhotoEngine extends Component {
    componentDidMount() {
        this.setState({ data:this.props.data,title:this.props.searchValue,photoIds:this.props.photoIds});
    }

    state = {
        searchValue:"",
        title:"",
        apiKey:"3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4",
        data:null,
        error:null,
        showedPhoto:null,
        indexOfShowedPhoto:null,
        suggestions:null,
        photoIds:null,
        topTags:["sun","see","trees","mountains","sky","people","sport","cars","dog","cat","animal","farm"]
      }
  //changes state after searchBar value changes
  valueChangedHandler= (event) =>{
  this.setState({ searchValue:event.target.value});
  this.fetchNewHints(event.target.value);
  }
  //fetches hints if searchBar value is longer than 2 
  fetchNewHints= (text)=>{
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
  //fetches one photo after clicking it on the thumbnail in grid, or clicking "go next" button in the single gallery view
  fetchOnePhoto = (id) => {
        axios.get('https://api.unsplash.com/photos/'+id+'?client_id=3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4')
        .then(response => {
          this.setState({ showedPhoto:response});
          let indexOfPic = this.state.photoIds.indexOf(id);
          this.setState({indexOfShowedPhoto: indexOfPic});
        })
        .catch(error => {
          this.setState({ error:error});
          console.log(error);
        });
  }
  //fetch and show next photo based on indexofshowedphoto and photoIds 
  showNextPhoto = () => {
    let indexOfPic = this.state.photoIds.indexOf(this.state.showedPhoto.data.id);
    if(indexOfPic!==this.state.photoIds.length-1)
    {
      this.fetchOnePhoto(this.state.photoIds[indexOfPic+1]);
    }
  }
   //fetch and show previous photo based on indexofshowedphoto and photoIds 
  showPrevPhoto = () => {
    let indexOfPic = this.state.photoIds.indexOf(this.state.showedPhoto.data.id);
    if(indexOfPic!==0)
    {
      this.fetchOnePhoto(this.state.photoIds[indexOfPic-1]);
    }
  }
 //after typing query in searchbar and clicking magnifying glass or pressing enter
  fetchPhotos = () =>{
    
    let idsArray=[];
      if(this.state.searchValue)
      {
        this.setState({ title:this.state.searchValue});
        axios.get('https://api.unsplash.com/search/photos?client_id=3D9Ayg46aXAF9_0DNCX1f99wfLCfuqsMtS1rgeR6aC4&query='+this.state.searchValue)
        .then(response => {
          response.data.results.map((photo,index) => (
            idsArray[index]=photo.id
        ));
        this.setState({ data:response,responded:true,error:null,suggestions:null,searchValue:null,photoIds:idsArray});
        })
        .catch(error => {
          this.setState({ error:error});
          console.log(error);
        });
      }
}
//after clicking on the suggestion or tabs on top of the page
  fetchPhotosFromSuggestion = (query) => {
  this.setState({ searchValue:query},this.fetchPhotos);
  document.getElementById("searchPhotoPage").value=query;
}
checkEnter = e => {
  if (e.keyCode === 13) {
    this.fetchPhotos();
  }
};
//x click in searchbar handler
  onXclick = () => {
    document.getElementById("searchPhotoPage").value=""; 
    document.getElementById("searchPhotoPage").focus();
    this.setState({searchValue:null});
}
  render(){

    let photos;   
    if(this.state.data)
    {
      photos = (
        <section className="photoGrid">
          {this.state.data.data.results.map((photo,index) => (
            
          <div className="photo" key={photo.id}><img loading="lazy" onClick={() => this.fetchOnePhoto(photo.id)} src={photo.urls.regular} alt={photo.alt_description} />
          <ul className="photoTag">
          {photo.tags.map((littleTag,index) => (

            (littleTag.source ? <li key={index}>{littleTag.source.title}</li> : <li key={index}>{littleTag.title}</li>)
          ))}
          </ul>
          </div>
      ))}
      </section>);
    }
    let showingPhoto;
    if(this.state.showedPhoto)
    {
      showingPhoto=(
        <div className="photoModalContainer">
          <button className="prevPicture"><FontAwesomeIcon onClick={this.showPrevPhoto} icon={faChevronLeft}/></button>
          <div className="photoModal">
            <div className="photoModalTopBar">
              <div className="leftText">
              <img loading="lazy" src={this.state.showedPhoto.data.user.profile_image.small} alt="username thumbnail"/>
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
            <img  className="mainPhoto" loading="lazy" src={this.state.showedPhoto.data.urls.full} alt={this.state.showedPhoto.data.alt_description}/>
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
          <div className="blackOverlay"  onClick={() => this.setState({ showedPhoto:null})}></div>
          <button className="nextPicture"><FontAwesomeIcon  onClick={this.showNextPhoto} icon={faChevronRight}/></button>
        </div>
      )
    }
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
     let topTags;
     topTags = (
      <ul className="topSearchTags" >
        {this.state.topTags.map(topTag=> (
          <li key={topTag} onClick={() => this.fetchPhotosFromSuggestion(topTag)}>{topTag}</li>
    ))}
    <div className="transisionGradient"></div>
    </ul>);

    if(this.state.showedPhoto && document.querySelector(".prevPicture") && document.querySelector(".nextPicture")){
        if(this.state.photoIds.indexOf(this.state.showedPhoto.data.id)===0)
      {
        document.querySelector(".prevPicture").classList.add("disabled");
        document.querySelector(".nextPicture").disabled=true;
      }
      else
      {
        document.querySelector(".prevPicture").classList.remove("disabled");
        document.querySelector(".nextPicture").disabled=false;
      }
      if(this.state.photoIds.indexOf(this.state.showedPhoto.data.id)===this.state.photoIds.length-1)
      {
        document.querySelector(".nextPicture").classList.add("disabled");
        document.querySelector(".prevPicture").disabled=true;
      }
      else
      {
        document.querySelector(".nextPicture").classList.remove("disabled");
        document.querySelector(".prevPicture").disabled=false;
      }
      }

    let xSign=null;
      if(document.getElementById("searchPhotoPage"))
      {
        document.getElementById("searchPhotoPage").value.length !==0 ? xSign = <FontAwesomeIcon onClick={() => this.onXclick()} icon={faTimes}/> : xSign = null;
    }
    return (
        <section className="photosPage" >
        <div className="searchBar">
          <i className="material-icons mdc-button__icon" onClick={this.fetchPhotos}>search</i>
          <input onKeyDown={this.checkEnter} type="text" id="searchPhotoPage" name="searchPhotoPage" placeholder="Search free high-resolution photos" onChange={this.valueChangedHandler} autoComplete="off"> 
          </input>
          {xSign}
        </div>
        {suggest}
        <h1>{this.state.title}</h1>
        <div className="topBarContainer">{topTags}</div>
        {photos}
        {showingPhoto}
        </section>
    );
  }
}

export default PhotoEngine;
