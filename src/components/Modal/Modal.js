import React from 'react';
import ReactDom from 'react-dom';
import configureStore from '../../store/configureStore';

const store = configureStore();

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
    const data = {}
    if (obj.data) data.symbol = obj.data
    const div = document.createElement('div');
    ReactDom.render(<Component store={store} close={close} data={data} />, div);
    outer.appendChild(div);
};
