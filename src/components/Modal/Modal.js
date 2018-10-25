import React from 'react';
import ReactDom from 'react-dom';

export default function (obj) {
    const Component = obj.component;
    let outer = document.getElementById('modal');
    if (!outer) {
        outer = document.createElement('div');
        outer.id = 'modal';
        document.body.appendChild(outer);
    }

    const close = () => {
        ReactDom.render(null, div);
        div.classList.add('closing')
        outer.removeChild(div)
    }
    const props = {}
    if (obj.props) Object.assign(props, obj.props);
    const div = document.createElement('div');
    ReactDom.render(<Component close={close} {...props} />, div);
    outer.appendChild(div);
};
