import React from 'react';
import html2pdf from 'html2pdf.js';

const ButtonPdf = () => {

    const onClickGenerate = () => {
        let html = document.querySelector('.content-pdf').cloneNode(true);
        html.querySelector('.filterZOnes');
        
        html2pdf().from(html).set({
            filename: 'reporte.pdf',
            margin: 1
        }).save();
    }

    return (
        <div className="col-md-12">
            <button
                className="btn background-blue pull-center"
                onClick={onClickGenerate}
            >Generar PDF</button>
        </div>
    );
};

export default ButtonPdf;