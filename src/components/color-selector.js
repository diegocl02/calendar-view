import React from 'react'
import { config } from '../shared/config'

export const ColorSelector = ({ colors, selectedIndex, onColorSelected }) => {
    return <div className="color-select-container">

        <label className="color-label"> Color: </label>
        {colors.map((color, index) => {
            return <div
                key={`${color}-${index}`}
                className={"color-input"}
                style={{
                    backgroundColor: color,
                    border:  selectedIndex === index 
                        ? `2px solid ${config.theme.selected}` : 
                        'none'
                }}
                onClick={(e) => onColorSelected(color)}/>
        })
        }

    </div>
}