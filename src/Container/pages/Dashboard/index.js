/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import { useNavigate } from "react-router-dom";
import { pathnameCONFIG } from "../../../constant/pathnameConfig";
import iconDetail from '../../../assets/images/icon-detail-16.png';
import iconDelete from '../../../assets/images/x-mark.png';
import { Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { serviceDeleteData, serviceListData } from "../../../utils/api/baseApiService";
import { handleExceptionError } from "../../../utils/helper";
import Lottie from "lottie-react";
import LoaderDelete from '../../../assets/animation/loaderDelete.json';
import IconNoData from '../../../assets/images/icon-no-data.png';

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

const Button = styled('div')(() => ({
    border: '1px solid #000',
    borderRadius: '40px',
    height: '60px',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 600
}))

const ButtonModalStyle = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '50px',
}))

const ModalStyle = (() => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    p: 6,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center'
}))

const EmptyData = styled('div')(() => ({
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '10vw',
    // textAlign: 'center',
    // backgroundColor: 'aqua',
}))

const Dashboard= () => {
    const navigate = useNavigate();
    const [listData, setListData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [successDelete, setSuccessDelete] = useState(false);
    const [emptyData, setEmptyData] = useState(false);

    useEffect(() => {
        const noData = listData.length === 0;
        setEmptyData(noData)
    },[listData.length])

    useEffect(() => {
        const fetchData = async() => {
            try {
                const payload = {};
                const response = await serviceListData(payload);
                const {status, data} = response;
                if(status === 200) {
                    setListData(data);
                } else if (handleExceptionError(status));
                console.warn('handleError');
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
        setOpenModal(true);
        setSelectedId(id)
    }

    const btnDelete = async() => {
        try {
            const response = await serviceDeleteData(selectedId);
            const {status} = response;
            if(status === 200) {
                setListData((prevData) => prevData.filter((item) => item.id !== selectedId));
                setOpenModal(false);
                setSuccessDelete(true);
            } else if (handleExceptionError(status)){
                console.error('handleError');            
            }
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
                    <Table sx={{ minWidth: 650 }} size="small">
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
                        {emptyData ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <img src={IconNoData}/>
                                    <EmptyData>'No Data Available'</EmptyData>
                                </TableCell>
                            </TableRow>
                            ) :
                        (<TableBody>
                         
                            {listData.map((row, index) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="right">{row.nik}</TableCell>
                            <TableCell align="right">{row.nama_karyawan}</TableCell>
                            <TableCell align="right">{row.tanggal_lahir}</TableCell>
                            <TableCell align="right">{row.jenis_kelamin}</TableCell>
                            <TableCell align="right" style={{display: 'flex', gap: '20px'}}>
                                <img src={iconDelete} onClick={() => handleIconToDelete(row.id)}/>  
                                <img src={iconDetail} onClick={() => handleIconToDetail(row.id)}/>
                            </TableCell>
                            </TableRow>
                        ))}
                    
                        </TableBody>)}
                    </Table>
                </TableContainer>
            </Container>
            <Modal
                open={openModal || successDelete}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={ModalStyle}>
                    {openModal ? ( 
                        <React.Fragment>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            Apakah anda ingin menghapus data ?
                            </Typography>
                            <ButtonModalStyle>
                                <Button onClick={() => setOpenModal(false)}>
                                    Tidak
                                </Button>
                                <Button onClick={btnDelete}>
                                    Iya
                                </Button>
                            </ButtonModalStyle>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            Berhasil Hapus Data
                            <Lottie animationData={LoaderDelete} height="20px"/>
                            <Button onClick={() => setSuccessDelete(false)}>
                                Kembali
                            </Button>
                        </React.Fragment>
                    )} 
                </Box>
                </Modal>
        </Body>
    )
}

export default Dashboard;