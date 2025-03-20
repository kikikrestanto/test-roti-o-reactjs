import React from "react";
import ButtonMUI from '@mui/material/Button';
import { Typography } from "@mui/material";
import classname from 'classnames';
import PropTypes from 'prop-types';

const Button = ({
    className,
    startIcon,
    endIcon,
    style,
    type,
    size,
    onClick,
    disabled,
    colorType,
    children,
    sx,
    ...others
}) => {
    const classNames = classname(
        'a-button',
        className,
        size,
        colorType
    );
    return (
        <React.Fragment>
            {(type=== 'button' || type ==='submit') && (
                <ButtonMUI
                    type={type}
                    className={classNames}
                    onClick={onClick}
                    startIcon={startIcon}
                    style={style}
                    sx={{
                        '.Muibutton-startIcon' : {
                            height:'20px'
                        },
                        width: '28vw',
                        height: '9vh',
                        borderRadius: '40px',
                        border: '1px solid #333333',
                        ...sx,
                    }}
                    {...others}
                >
                    <Typography
                        variant="text"
                        sx={{
                            fontSize: '14px',
                            color:'#333333'
                        }}
                    >
                        {children}
                    </Typography>
                </ButtonMUI>
            )}
        </React.Fragment>
    );
};

Button.propTypes = {
    className : PropTypes.string,
    startIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    endIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
    style: PropTypes.object,
    type : PropTypes.string,
    size: PropTypes.oneOf([
        'md',
        'sm',
        'custom',
        'lg',
        'xxl',
        'xl',
        'scd',
        'xsm',
      ]),
    onClick: PropTypes.func,
    disabled : PropTypes.bool,
    colorType: PropTypes.oneOf(['primary', 'secondary']),
    children: PropTypes.node,
    sx: PropTypes.object,
};

Button.defaultProps = {
    className : '',
    startIcon: null,
    endIcon: null,
    style: {},
    type : 'button',
    size: 'md',
    onClick: () => {},
    disabled : false,
    colorType: 'primary',
    children: null,
    sx: {},
}

export default Button;