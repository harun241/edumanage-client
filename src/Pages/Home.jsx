import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner';
import BeInstructor from '../components/BeInstructor';
import WebStats from '../components/WebStats';
import Partners from '../components/Partners';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <BeInstructor></BeInstructor>
            <WebStats></WebStats>
            <Partners></Partners>
            

        </div>
    );
};

export default Home;