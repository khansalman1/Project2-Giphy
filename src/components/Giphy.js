import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';


const Giphy = () => {
    
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        
        const fetchData = async () => {
            setIsError(false); 

            try {

                const results = await axios("https://api.giphy.com/v1/gifs/trending", {
                 params:{
                     api_key:"ZpMf0IbEZm4cDF8XMROIKlCD5HzyFDxC"
                 }
            });

            console.log(results);
            setData(results.data.data);

            } catch (err) {
                setIsError(true);
                console.log(err);

            }  
        };
        fetchData()
    }, []);
    const renderGifs = () => {
        return data.map(el => {
            return (
                
                    <div key={el.id}>
                        <img src={el.images.fixed_height.url} />
                    </div>
                
            );
        });
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);

        try {
            const results = await axios("https://api.giphy.com/v1/gifs/search", {
             params:{
                 api_key:"ZpMf0IbEZm4cDF8XMROIKlCD5HzyFDxC",
                 q: search,
             }
        });
    
        console.log(results);
        setData(results.data.data);
    
        } catch (err) {
            setIsError(true);
            console.log(err);
    
        }  
    }

    

  return (
    <div>
    <Container fixed maxWidth="lg">

        <form>

            <input value={search}
                onChange={handleSearchChange}
                type="text"
                placeholder='search your GIF'
            />
            <Button variant="contained"
                onClick={handleSubmit}
                type="submit" 
            > Search

            </Button>
            
        </form>        

    


        <ImageList lg={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            <div>{renderGifs()}</div>

        </ImageList>
    </Container>

   </div>
  
  )
  
}

export default Giphy;
 