/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pathnameCONFIG } from "../../../constant/pathnameConfig";
import iconDetail from '../../../assets/images/icon-detail-16.png';
import iconDelete from '../../../assets/images/x-mark.png';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Body = styled('div')(() => ({
    backgroundImage : `url(${Backdrop})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'hidden',
    overflowX: 'hidden',

    '@media (max-width: 480px)': {
        height: '100vh',
        
    }

}))

const Container = styled('div')(() => ({
    backgroundColor : 'white',
    width: '50%',
    height: '85vh',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '@media (max-width: 768px)' : {
        height: '95vh',
        width: '50%',
      },
    
    '@media (max-width: 480px)': {
        height: '80%',
        width: '80%',
    }
}));

const CircleIcon = styled('div')(() => ({
    borderRadius: '100px',
    backgroundColor: '#C4C4C4',
    width:'50px',
    height: '50px',
}))

const Button = styled('div')(() => ({
    border: '1px solid #000',
    borderRadius: '40px',
    height: '60px',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Space = styled('div') (({space}) => ({
    height: space  ?? '10px'
}));

const TextStyle = styled('div')(() => ({
    fontSize: '1em',
}))

const HeaderStyle = styled('div')(() => ({
    width: '70%',
    display: 'flex',
    justifyContent: 'space-between',
}))

const ButtonAddStyle = styled(Button)(() => ({
    borderRadius: '20px',
    border: '1px solid',
    width: '20%',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'aqua',
    fontWeight: 600
}))

const Dashboard= () => {
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const payload = {};
                const response = await axios.post("http://localhost:8000/api/list-data", payload);
                console.log('response', response);
                setListData(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    },[])
    
    const handleIconToDetail = (id) => {
        navigate(`${pathnameCONFIG.ROOT_URL_DETAIL}/${id}`);
        
    }

    const handleIconToDelete = async (id) => {
        try {
            const payload = {id};
            const response = await axios.post(`http://localhost:8000/api/delete-data/${id}`, payload);
            console.log('response delete', response);
            setListData((prevData) => prevData.filter((item) => item.id !== id));
            
        } catch(error) {
            console.error(error);
            
        }
        
    }

    return (
        <Body>
            <Container>
                <HeaderStyle>
                <TextStyle>Dashboard</TextStyle>
                <ButtonAddStyle onClick={() => navigate(pathnameCONFIG.ADD)}>
                Add Data
                </ButtonAddStyle>
                </HeaderStyle>
                    <TableContainer component={Paper}>
      <Table aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">NIK</TableCell>
            <TableCell align="right">Nama Karyawan</TableCell>
            <TableCell align="right">Tanggal Lahir</TableCell>
            <TableCell align="right">Jenis Kelamin</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell component="th">
                {index +1}
              </TableCell>
              <TableCell align="right">{row.nik}</TableCell>
              <TableCell align="right">{row.nama_karyawan}</TableCell>
              <TableCell align="right">{row.tanggal_lahir}</TableCell>
              <TableCell align="right">{row.jenis_kelamin}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell >
              <img src={iconDetail} onClick={() => handleIconToDetail(row.id)}/>
              <img src={iconDelete} onClick={() => handleIconToDelete(row.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Container>
        </Body>
    )
}

export default Dashboard;