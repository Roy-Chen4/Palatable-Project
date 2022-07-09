import React from "react";
import {
  Card,
  Typography,
  Grid,
  ButtonBase
} from "@material-ui/core";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import './Banner.css'

function Banner(props) {
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    const ImageButton = styled(ButtonBase)(({theme}) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
        //   width: '100% !important',
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zindex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        },
      }));
      
    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        borderRadius: '2vw',
    });
      
      const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      }));
      
    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 10,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        borderRadius: '2vw',
        transition: theme.transitions.create('opacity'),
    }));
      
    const ImageMarked = styled('span')(({ theme }) => ({
        height: 0,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <ImageButton
                focusRipple
                key={props.ingredient.name}
                style={{
                    width: props.ingredient.width,
                    borderRadius: '2vw',
                }}
            >
                <ImageSrc style={{ backgroundImage: `url(${props.ingredient.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                        component="span"
                        variant="h5"
                        color="inherit"
                        sx={{
                            position: 'relative',
                            fontSize: '1.4rem', 
                            fontWeight: '700', 
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                    >
                        {props.ingredient.name}
                        <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
            </ImageButton>
        </Grid>
    );

    for (let i = 0; i < mediaLength; i++) {
        const ingredient = props.ingredient.items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={ingredient.name}>
                <ImageButton
                    focusRipple
                    key={ingredient.title}
                    style={{
                        width: ingredient.width,
                        borderRadius: '2vw',
                    }}
                >
                    <ImageSrc style={{ backgroundImage: `url(${ingredient.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="h5"
                            color="inherit"
                            sx={{
                                position: 'relative',
                                fontSize: '1.4rem',
                                fontWeight: '700', 
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {ingredient.name}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            </Grid>
        );

        items.push(media);
    }

    items.unshift(content);

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    );
}

export default Banner;

Banner.propTypes = {
    contentPosition: PropTypes.string,
    length: PropTypes.number,
    ingredient: PropTypes.func,
}