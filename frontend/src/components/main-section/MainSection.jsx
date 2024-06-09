import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import StudentAvatar from "../../assets/student.jpg"
import FindABook from '../find-a-book/FindABook'
import "./main_section.css"

/**
 * @typedef Book
 * @property {string} author
 * @property {string} title
 * @property {string} coverPhotoURL
 * @property {string} readingLevel
 */

export default function MainSection() {

    const [readingList, setReadingList] = useState([]);

    /**
     * 
     * @param {Book} book 
     */
    function assignBook(book){

        if(!readingList.includes(book)){

            setReadingList((currentList) => {

                return currentList.concat([book]);
            });
        }
    }

    /**
     * 
     * @param {Book} book 
     */
    function unassignBook(selectedBook){

        setReadingList((currentList) => {

            return currentList.filter((book) => book !== selectedBook);
        });
    }

    return (
        <Box variant="div" sx={{ px: "24px", paddingTop: { xs: "72px", sm: "72px", md: "98px", lg: "98px" } }}>
            <Box variant="div" sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" }, justifyContent: "space-between" }}>
                <Box variant="div" sx={{ width: { xs: "auto !important", sm: "auto !important", md: "40% !important", lg: "60% !important" } }}>
                    <Typography variant="h1" sx={{ fontWeight: "900", fontSize: { xs: "3rem", sm: "3rem", md: "4rem", lg: "5rem" }, color: "#335c6e", fontFamily: "Mulish" }}>Assign Books</Typography>
                    <Typography sx={{ fontWeight: "400", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, color: "#335c6e", fontFamily: "Mulish", marginTop: "16px" }}>Use the form to search for a book and assign it to a student</Typography>
                    <Box variant="div" sx={{ marginTop: { xs: "70px", sm: "70px", md: "80px", lg: "100px" }, width: "auto !important" }}>
                        <Typography sx={{ fontWeight: "900", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, color: "#335c6e", fontFamily: "Mulish" }}>For:</Typography>
                        <Box variant="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: { xs: "16px", sm: "16px", md: "24px", lg: "24px" } }}>
                            <img className='avatar' src={StudentAvatar}/>
                            <Typography sx={{ fontWeight: "400", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, fontFamily: "Mulish", marginLeft: { xs: "8px", sm: "8px", md: "16px", lg: "16px" } }}>Leon Omondi</Typography>
                        </Box>
                    </Box>
                </Box>
                <FindABook assignBook={assignBook}/>
            </Box>
            <Box variant="div" sx={{ marginTop: "64px", width: "auto !important" }}>
                <Typography sx={{ fontWeight: "900", fontSize: { xs: "1.6rem", sm: "1.6rem", md: "2.2rem", lg: "2.2rem" }, color: "#fabd33", fontFamily: "Mulish" }}>Current Reading List</Typography>
                <Box variant="div" sx={{ py: { xs: "40px", sm: "40px", md: "56px", lg: "56px" } }}>
                    <Box variant="div" sx={{ bgcolor: "rgba(255,230,220,.39)", p: { xs: "8px", sm: "8px", md: "32px", lg: "32px" }, borderRadius: { xs: "16px", sm: "16px", md: "24px", lg: "24px" }, display: "grid", gridTemplateColumns: { xs: "repeat(auto-fill, minmax(100%, 1fr))", sm: "repeat(auto-fill, minmax(38%, 1fr))", md: "repeat(auto-fill, minmax(38%, 1fr))", lg: "repeat(auto-fill, minmax(38%, 1fr))" }, gap: { xs: "32px", sm: "32px", md: "80px", lg: "80px" } }}>
                        { readingList.length === 0 && (
                            <Typography sx={{ fontWeight: "600", fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1.1rem", lg: "1.1rem" }, fontFamily: "Mulish" }}>No books assigned</Typography>
                        ) }
                        { readingList.map((book) => (

                            <Box key={book.id} variant="div" sx={{ display: "flex", flexDirection: "row", gap: { xs: "16px", sm: "16px", md: "24px", lg: "24px" } }}>
                                <img className='search-image list-image' src={book.coverPhotoURL}/>
                                <Box variant="div" sx={{ alignSelf: "end", height: "max-content !important" }}>
                                    <Typography sx={{ fontWeight: "600", fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1.1rem", lg: "1.1rem" }, fontFamily: "Mulish" }}>{book.title}</Typography>
                                    <Typography sx={{ fontWeight: "300", fontSize: { xs: "0.85rem", sm: "0.85rem", md: "1rem", lg: "1rem" }, fontFamily: "Mulish", marginTop: "8px" }}>{book.author}</Typography>
                                    <button className='assign-btn remove-btn' onClick={(e) => unassignBook(book)}>Remove</button>
                                </Box>
                            </Box>
                        )) }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
