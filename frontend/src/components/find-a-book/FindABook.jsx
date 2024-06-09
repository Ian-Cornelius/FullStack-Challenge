import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./find_a_book.css"
import SearchIcon from "../../assets/search_circle.svg"
import { useQuery, gql } from '@apollo/client';
import "../../assets/image1.webp"
import "../../assets/image2.webp"
import "../../assets/image3.webp"
import "../../assets/image4.webp"
import "../../assets/image5.webp"
import "../../assets/image6.webp"
import "../../assets/image7.webp"
import "../../assets/image8.webp"
import "../../assets/image9.webp"
import "../../assets/image10.webp"

const GET_BOOKS = gql`
{
    books{
        title
        author
        coverPhotoURL
        readingLevel
    }   
}
`;

export default function FindABook({ assignBook }) {

    const { loading, error, data } = useQuery(GET_BOOKS);
    const [title, setTitle] = useState("");
    const [loadedData, setLoaded] = useState(false);
    const [loadedBooks, setLoadedBooks] = useState([]);
    const [matchingBooks, setMatchingBooks] = useState([]);

    useEffect(() => {

        if(!loading){

            setLoaded(true);
        }
    }, [loading]);

    useEffect(() => {

        if(data){
            
            setLoadedBooks(data.books.map((book) => ({ ...book, coverPhotoURL: `/src/${book.coverPhotoURL}`, id: crypto.randomUUID() })));
        }
    }, [data])

    useEffect(() => {

        if(title){

            const exactMatch = loadedBooks.filter((book) => book.title.toLowerCase() === title.toLowerCase());
            const startsWith = loadedBooks.filter((book) => book.title.toLowerCase().startsWith(title.toLowerCase()) && !exactMatch.includes(book));
            const includesMatch = loadedBooks.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()) && !startsWith.includes(book));
            setMatchingBooks((currentMatching) => {

                return exactMatch.concat(startsWith).concat(includesMatch);
            });
        } else {

            setMatchingBooks([]);
        }
    }, [title]);

    function searchTitle(e){

        const title = e.target.value;
        setTitle(title);
    }

    function assignBookToStudent(selectedBook){

        setMatchingBooks((currentMatches) => {

            //remove from current list
            return currentMatches.filter((book) => book.id !== selectedBook.id);
        });
        assignBook(selectedBook);
    }

    return (
        <Box variant="div" sx={{ position: "relative", width: { xs: "auto !important", sm: "auto !important", md: "60% !important", lg: "40% !important" }, borderRadius: "32px", py: { xs: "24px !important", sm: "24px !important", md: "40px !important", lg: "40px !important" }, bgcolor: "#CFFAFA", height: "max-content !important", marginTop: { xs: "48px", sm: "48px", md: "0", lg: "0" } }}>
            <Box variant="div" sx={{ width: "auto !important", px: { xs: "16px !important", sm: "16px !important", md: "32px !important", lg: "32px !important" }, height: "max-content !important", marginBottom: "16px" }}>
                <Typography sx={{ fontWeight: "600", fontSize: { xs: "1rem", sm: "1rem", md: "1.2rem", lg: "1.2rem" }, fontFamily: "Mulish" }}>Find a book</Typography>
                <Box variant="div" sx={{ p: "8px", bgcolor: "rgba(83,194,194,.28)", borderRadius: "200px", marginTop: { xs: "16px", sm: "16px", md: "24px", lg: "24px" }, display: "flex", flexDirection: "row", justifyContent: "space-between", ":hover": { bgcolor: "rgba(83,194,194,.58)"} }}>
                    <input className='title-input' placeholder='Title' onChange={searchTitle} value={title}></input>
                    <button><img src={SearchIcon}/></button>
                </Box>
            </Box>
            <Box variant="div" sx={{ position: "absolute", width: "100% !important", boxSizing: "border-box", borderRadius: "0 0 32px 32px", px: { xs: "24px !important", sm: "24px !important", md: "32px !important", lg: "32px !important" }, py: "8px !important", bgcolor: "#CFFAFA", maxHeight: { xs: "200px !important", sm: "200px !important", md: "250px !important", lg: "250px !important" }, overflowY: "auto" }}>

                { !loadedData && 
                    <Box variant="div" sx={{ my: { xs: "8px", sm: "8px", md: "16px", lg: "16px" }, display: "flex", flexDirection: "row", alignItems: "center", gap: { xs: "8px", sm: "8px", md: "16px", lg: "16px" } }}>
                        <span className="loader"></span>
                        <Typography variant='p' sx={{ fontWeight: "600", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, fontFamily: "Mulish" }}>Loading...</Typography>
                    </Box>
                }

                { error &&  
                    <Typography variant='p' sx={{ fontWeight: "600", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, fontFamily: "Mulish" }}>Failed to load data. Please refresh</Typography>
                }

                { matchingBooks.length !== 0 &&

                    (<Box variant="div" sx={{ marginTop: { xs: "24px", sm: "24px", md: "32px", lg: "32px" } }}>
                        { matchingBooks.map((book) => (

                            <Box key={book.id} variant="div" sx={{ position:"relative", px: "8px", display: "flex", flexDirection: "row", gap: { xs: "8px", sm: "8px", md: "16px", lg: "16px" }, marginBottom: "16px" }}>
                                <img className='search-image' src={book.coverPhotoURL}/>
                                <Box variant="div" sx={{ flexGrow: "1", bgcolor: "transparent" }}>
                                    <Typography sx={{ fontWeight: "600", fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1.1rem", lg: "1.1rem" }, fontFamily: "Mulish" }}>{book.title}</Typography>
                                    <Typography sx={{ fontWeight: "300", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, fontFamily: "Mulish", marginTop: "8px" }}>{book.author}</Typography>
                                </Box>
                                <button className='assign-btn' onClick={(e) => assignBookToStudent(book)}>Assign</button>
                            </Box>
                        )) }
                    </Box>)
                }
            </Box>
        </Box>
    )
}
