/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Backdrop from '../../../assets/images/Backdrop.png';
import { Box, Button, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import iconBack from '../../../assets/images/back-button.png';
import { serviceGetData, serviceUpdateData } from "../../../utils/api/baseApiService";
import { Form, Field } from "react-final-form";
import Lottie from "lottie-react";
import { pathnameCONFIG } from "../../../constant/pathnameConfig";
import LoaderSuccess from '../../../assets/animation/successAnimation.json';

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
    width: '50vw',
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

// const Button = styled('div')(() => ({
//     border: '1px solid #000',
//     borderRadius: '40px',
//     height: '60px',
//     width: '70%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// }));

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

const ErrorStyle = styled('div')(() => ({
    color: 'red',
    fontWeight: 'bold',
    fontSize: '14px'
}))

const ButtonCustom = styled(Button)(() => ({
    border: '1px solid #000 !important',
    borderRadius: '40px !important',
    height: '60px !important',
    width: '70% !important',
    backgroundColor: '#666666 !important',
    color: '#FFF !important'
}));

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

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nik: '',
        nama_karyawan: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
    })

    console.log('formData', formData);
    

    const fetchData = useCallback(async () => {
        try {
            const response = await serviceGetData(id);
            if(response.status === 200) {
                setFormData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    },[id]);

    useEffect(() => {
        fetchData();
    },[fetchData])

    const handleUpdate = async (values) => {
        const payload = {
            id,
            nik: values.nik,
            nama_karyawan: values.namaKaryawan,
            tanggal_lahir: values.tanggalLahir,
            jenis_kelamin: values.jenisKelamin
        }
        try {
            const response = await serviceUpdateData(id, payload);
            const {status} = response;
            console.log('response', response);
            
            if(status === 200){
                setSuccess(true)
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <Body>
            <Form
                        validate={(values) => {
                            const errors = {};
                            if(!values.nik) {
                                errors.nik = 'Data wajib diisi';
                            }
                            if(!values.namaKaryawan){
                                errors.namaKaryawan = 'Data wajib diisi';
                            } if(!values.tanggalLahir) {
                                errors.tanggalLahir = 'Data wajib diisi';
                            } if(!values.jenisKelamin) {
                                errors.jenisKelamin = 'Data wajib diisi';
                            }
                            return errors;
                        }}
                        keepDirtyOnReinitialize
                        onSubmit={handleUpdate}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                            <Container>
                            <div style={{ display: "flex", justifyContent: 'space-between' , width: '70%'}}>
                            <img src={iconBack} onClick={() => navigate(-1)}/>
                            <TextStyle>Edit Data</TextStyle>
                            </div>
                            
                            <Space space="15px"/>
                            <Field name="nik" initialValue={formData.nik}>
                            {({input,meta}) => (
                                <React.Fragment>
                                    <TextForm>
                                        NIK
                                    </TextForm>
                                        <FormInput
                                        id="nik"
                                        placeholder="NIK"
                                        type="text"
                                        value={input.value}
                                        onChange={(val) => input.onChange(val)}
                                        maxLength={16}
                                        isError={!!meta.error && meta.touched}
                                    />
                                    {meta.error && meta.touched && (
                                        <ErrorStyle>{meta.error}</ErrorStyle>
                                    )}
                                </React.Fragment>
                            )}
                            </Field>
                            
                            <Space space="15px"/>
                            <Field name="namaKaryawan" initialValue={formData?.nama_karyawan}>
                            {({input,meta}) => (
                                <React.Fragment>
                                    <TextForm>
                                        Nama Karyawan
                                    </TextForm>
                                        <FormInput
                                        id="namaKaryawan"
                                        placeholder="Nama Karyawan"
                                        type="text"
                                        value={input.value}
                                        onChange={(val) => input.onChange(val)}
                                        isError={!!meta.error && meta.touched}
                                    />
                                    {meta.error && meta.touched && (
                                        <ErrorStyle>{meta.error}</ErrorStyle>
                                    )}
                                </React.Fragment>
                            )}
                            </Field>
                            <Space space="15px"/>
                            <Field name="tanggalLahir" initialValue={formData?.tanggal_lahir}>
                            {({input,meta}) => (
                                <React.Fragment>
                                    <TextForm>
                                        Tangal Lahir
                                    </TextForm>
                                        <FormInput
                                        id="tanggalLahir"
                                        placeholder="Tanggal Lahir"
                                        type="date"
                                        value={input.value}
                                        onChange={(val) => input.onChange(val)}
                                        isError={!!meta.error && meta.touched}
                                    />
                                    {meta.error && meta.touched && (
                                        <ErrorStyle>{meta.error}</ErrorStyle>
                                    )}
                                </React.Fragment>
                            )}
                            </Field>
                            <Space space="15px"/>
            
                            <Field name="jenisKelamin" initialValue={formData?.jenis_kelamin}>
                            {({input,meta}) => (
                                <React.Fragment>
                                    <TextForm>
                                        Jenis Kelamin
                                    </TextForm>
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            value={input.value}
                                            onChange={(e) => input.onChange(e.target.value)}

                                        >
                                        <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
                                        <FormControlLabel value="laki-laki" control={<Radio />} label="Laki Laki" />
                                    </RadioGroup>
                                    {meta.error && meta.touched && (
                                        <ErrorStyle>{meta.error}</ErrorStyle>
                                    )}
                                    </FormControl>
                                </React.Fragment>
                            )}
                            </Field>
                            <Space space="15px"/>
                            <ButtonCustom type="submit">
                                Simpan
                            </ButtonCustom>
                        </Container>
                            </form>
                        )}
                        />
                        <Modal
                            open={success}
                            onClose={() => setSuccess(false)}>
                            <Box sx={ModalStyle}>
                                    <React.Fragment>
                                        <Lottie animationData={LoaderSuccess} height="20px"></Lottie>              
                                        <Button onClick={() => {
                                            setSuccess(false);
                                            navigate(pathnameCONFIG.DASHBOARD);
                                            }}>
                                            Siapppp!!!!    
                                        </Button>
                                    </React.Fragment>
                            </Box>
                        </Modal>
        </Body>
    )
}

export default Edit;