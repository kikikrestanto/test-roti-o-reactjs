/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import iconBack from '../../../assets/images/back-button.png';
import { pathnameCONFIG } from "../../../constant/pathnameConfig";

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

const FormInput = styled(TextField)(() => ({
    width: '70%',
    marginBottom: '10px',
    borderRadius: '20px',
}))

const TextForm = styled('div')(() => ({
    color: '#666666',
    fontSize: '12px',
    alignSelf: 'flex-start',
    marginLeft: '7rem',

    '@media (max-width: 768px)' : {
        marginLeft: '3.5rem',
      },
    
    '@media (max-width: 480px)': {
        marginLeft: '3rem',
    }
}))

const TextStyle = styled('div')(() => ({
    fontSize: '1em',
}))

const Detail = () => {
    const {id} = useParams();
    console.log('id detail', id);
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nik: '',
        nama_karyawan: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
    })

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/get-data/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error(error);
        }
    },[id]);

    useEffect(() => {
        fetchData();
    },[fetchData])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToDetail = (id) => {
        navigate(`${pathnameCONFIG.ROOT_URL_EDIT}/${id}`);
            
    };
    return (
        <Body>
            <Container>
                <div style={{ display: "flex", justifyContent: 'space-between' , width: '70%'}}>
                                <img src={iconBack} onClick={() => navigate(pathnameCONFIG.DASHBOARD)}/>
                                <TextStyle>Detail Data</TextStyle>
                                </div>
                <Space space="15px"/>
                <TextForm>
                    NIK
                </TextForm>
                <FormInput
                    id="nik"
                    placeholder="NIK"
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    disabled
                />
                <Space space="15px"/>
                <TextForm>
                    Nama Karyawan
                </TextForm>
                <FormInput
                    id="namaKaryawan"
                    name="nama_karyawan"
                    placeholder="text"
                    type="Nama Karyawan"
                    value={formData.nama_karyawan}
                    onChange={handleInputChange}
                    disabled
                />
                <Space space="15px"/>
                <TextForm>
                    Tanggal Lahir
                </TextForm>
                <FormInput
                    id="tanggalLahir"
                    name="tanggal_lahir"
                    placeholder="Tanggal Lahir"
                    type="date"
                    value={formData.tanggal_lahir}
                    onChange={handleInputChange}
                    disabled
                />
                <Space space="15px"/>
                <TextForm>
                    Jenis Kelamin
                </TextForm>
                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="laki-laki"
                                        name="jenis_kelamin"
                                        onChange={handleInputChange}
                                        disabled
                                    >
                                        <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
                                        <FormControlLabel value="laki-laki" control={<Radio />} label="Laki Laki" />
                                    </RadioGroup>
                                    </FormControl>
                <Space space="15px"/>
                <Button style={{backgroundColor: '#666666', border: 'none', color: '#fff'}} 
                onClick={handleToDetail}
                >
                    Edit
                </Button>
            </Container>
        </Body>
    )
}

export default Detail;