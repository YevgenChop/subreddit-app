import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AppBar from "@material-ui/core/AppBar/AppBar";

const options = ['sports', 'books', 'travel', 'funny', 'science', 'shopping'];

/**
 * @class Header
 * @desc dumb component that gets props and displays the title and the select
 */

const propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

class Header extends PureComponent {
    handleChange = (event, value) => {
        const { onChange } = this.props;
        return onChange(value);
    };

    render() {
        const { value } = this.props;
        return (
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {options.map(option => (
                        <Tab value={option} label={option.toUpperCase()} key={option}/>
                    ))}
                </Tabs>
            </AppBar>
        );
    }
}

Header.propTypes = propTypes;

export default Header;
