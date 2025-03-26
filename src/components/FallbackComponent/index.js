import { Box } from "@mui/material";
import Loader from "../Loader";
import PropTypes from 'prop-types';


const FallbackComponent = ({minHeight}) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        minHeight
    }}
    width="100%"
    height="100%"
    >
        <Loader/>
    </Box>
)

FallbackComponent.propTypes = {
    minHeight: PropTypes.string
}

FallbackComponent.defaultProps = {
    minHeight: 'unset'
}

export default FallbackComponent;