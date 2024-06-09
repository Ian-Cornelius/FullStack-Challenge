import { Box, Typography } from '@mui/material'
import React from 'react'
import TeacherAvatar from "../../assets/teacher.jpg"

export default function Navbar() {
  return (
    <Box variant="div" sx={{ position: "relative", py: { xs: "20px", sm: "20px", md: "24px", lg: "24px" }, px: "24px", zIndex: "20" }}>
        <Box variant="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", position: "sticky", top: "0" }}>
            <img className='logo' src='../ello_logo.svg'/>
            <Box variant="div" sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "16px" }}>
                <Typography sx={{ height: "max-content", fontFamily: "Mulish", fontSize: { xs: "0.8rem", sm: "0.8rem", md: "1rem", lg: "1rem" } }}>Teacher Raychelle</Typography>
                <img className='avatar' src={TeacherAvatar}/>
            </Box>
        </Box>
        <Box variant="div" sx={{ position: "absolute", bottom: "0", left: "0", width: "100%", height: "2px", bgcolor: "rgba(255,230,220,.48)" }}/>
    </Box>
  )
}
