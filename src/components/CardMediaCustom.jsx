import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';

/**
 * @class CardMediaCustom
 * @desc Hoc fixes amps on images links
 */
const CardMediaCustom = ({ image, ...props }) => {
    image = image.replace(/amp;s/g, 's');
    image = image.replace(/amp;/g, '');

    return (
        <CardMedia {...props} image={image} />
    );
};

export default CardMediaCustom;
