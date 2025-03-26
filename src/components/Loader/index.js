import PropTypes from 'prop-types';
import { Dialog } from "@mui/material";
import DialogContent from "@mui/material";
import Box from "@mui/material";
import Lottie from "lottie-react";
import LoaderAnimation from '../../assets/animation/loaderAnimation.json';

const Loader = ({ isLoading}) => (
    <Dialog
        open = {isLoading}
        PaperProps={{style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        }}}
    >
        <DialogContent>
            <Box sx={{display: 'flex'}}>
                <Lottie animationData={LoaderAnimation} style={{height: 200}} />
            </Box>
        </DialogContent>
        
    </Dialog>
)

Loader.propTypes = {
    isLoading: PropTypes.bool,
};

Loader.defaultProps = {
    isLoading: false,
}

export default Loader;