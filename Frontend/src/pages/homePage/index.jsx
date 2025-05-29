import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.scss';

function HomePage() {
    return (
        <>
            <div className='container'>
                <main>
                    <p>Hello World!</p>

                </main >
            </div >
        </>
    );
}

export default memo(HomePage);