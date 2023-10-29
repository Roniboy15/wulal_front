import React from 'react';
import './whatsapp.css'

const WhatsAppIcon = ({ phoneNumber }) => {
    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}`);
    };

    return (
        <div className="whatsapp-icon" onClick={handleClick}>
            <i class="fa-brands fa-whatsapp fa-xs fa-shake"></i>
        </div>
    );
};

export default WhatsAppIcon;
