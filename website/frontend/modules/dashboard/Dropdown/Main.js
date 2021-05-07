import React from 'react'
import Navbar from './Navbar'
import Item from './Item'
import DropMenu from './DropMenu'
//Icons
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
const Dropdown = () => {
    return (
        <Navbar>
            <Item icon={<PlusIcon />} />
            <Item icon={<BellIcon />} />
            <Item icon={<MessengerIcon />} />

            <Item icon={<CaretIcon />}>
                <DropMenu></DropMenu>
            </Item>
        </Navbar>
    )
}

export default Dropdown
