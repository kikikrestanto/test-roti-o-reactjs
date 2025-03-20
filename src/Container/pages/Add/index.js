/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import axios from "axios";
import iconBack from '../../../assets/images/back-button.png';
import { useNavigate } from "react-router-dom";
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

const Add= () => {
    const navigate = useNavigate();
    const [nik, setNik] = useState('');
    const [namaKaryawan, setNamaKaryawam] = useState('');
    const [tanggalLahir, setTanggalLahir] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');


    const handleAddData = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/add-data", {nik,nama_karyawan: namaKaryawan, tanggal_lahir: tanggalLahir, jenis_kelamin :jenisKelamin});
            console.log('response', response);
            alert('Berhasil disimpan', response);
            navigate(-1);
        } catch(error) {
            console.error(error);
        }
    }
    
    return (
        <Body>
            <Container>
                <div style={{ display: "flex", justifyContent: 'space-between' , width: '70%'}}>
                <img src={iconBack} onClick={() => navigate(-1)}/>
                <TextStyle>Add Data</TextStyle>
                </div>
                
                <Space space="15px"/>
                <TextForm>
                    NIK
                </TextForm>
                <FormInput
                    id="nik"
                    placeholder="NIK"
                    type="text"
                    onChange={(e) => setNik(e.target.value)}
                />
                <Space space="15px"/>
                <TextForm>
                    Nama Karyawan
                </TextForm>
                <FormInput
                    id="namaKaryawan"
                    placeholder="text"
                    type="Nama Karyawan"
                    onChange={(e) => setNamaKaryawam(e.target.value)}
                />
                <Space space="15px"/>
                <TextForm>
                    Tanggal Lahir
                </TextForm>
                <FormInput
                    id="tanggalLahir"
                    placeholder="Tanggal Lahir"
                    type="date"
                    onChange={(e) => setTanggalLahir(e.target.value)}
                />
                <Space space="15px"/>

                <TextForm>
                    Jenis Kelamin
                </TextForm>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="laki-laki"
                        name="radio-buttons-group"
                        onChange={(e) => setJenisKelamin(e.target.value)}
                    >
                        <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
                        <FormControlLabel value="laki-laki" control={<Radio />} label="Laki Laki" />
                    </RadioGroup>
                    </FormControl>
                <Space space="15px"/>
                <Button style={{backgroundColor: '#666666', border: 'none', color: '#fff'}} 
                onClick={handleAddData}
                >
                    Add
                </Button>
            </Container>
        </Body>
    )
}

export default Add;