import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'component/ButtonGroup/ButtonGroup';
import './control.css'

export function ControlGroup(props) {
    const { name, changeName, ...buttonProps } = props;
    return (
        <div className="control-container">

					<ButtonGroup {...buttonProps}	/>

          <div className="name-container">
            <input type="text" value={name} onChange={changeName} />
          </div>
        </div>
    )
}

ControlGroup.propTypes = {
	name: PropTypes.string.isRequired,
	changeName: PropTypes.func.isRequired
}