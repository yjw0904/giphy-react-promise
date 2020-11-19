
import './App.css';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState([])
  
  const handleSearchTermChange = (event) => {      
    setSearchTerm(event.target.value)     
  } 

  const handleClickSearch = () =>{
    const url = `https://api.giphy.com/v1/gifs/search?api_key=oHMgKjWbeDDZBSH2PvuWliHL91Luj7lY&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en`
    
    fetch(url)
    .then((res) => {      
      return res.json()
    })
    .then((data) => {
      if(data.data && _.isArray(data.data)){
        setGifs(data.data.map( (dataPoint) => {
          return {
            id: dataPoint.id,
            url: dataPoint.images.downsized.url,
            title: dataPoint.title,
          }
        }))        
      }
    })    
  }  
  // console.log(gifs)

  return (      
    <div className="App">
      <div>
        <TextField                    
          onChange={handleSearchTermChange}
          label="Enter the search string"
          variant="outlined"
        />                
        <br/>
      </div>
      <button onClick={handleClickSearch}>
        Get Data
      </button>
      <div className="gifsDisplay">
        {gifs.map( (item, index) => (
          // <div key={item.id} className="url">{item.url}</div>
          <img key={item.id} src={item.url} />
        ))}
      </div>
    </div>
  );
}

export default App;
