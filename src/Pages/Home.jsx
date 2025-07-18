import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner';
import BeInstructor from '../components/BeInstructor';
import WebStats from '../components/WebStats';
import Partners from '../components/Partners';
import TopRatedClasses from '../components/TopratedClasses';
import PopularClasses from '../components/PopularClass';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <BeInstructor></BeInstructor>
            <WebStats></WebStats>
            <Partners></Partners>
            <TopRatedClasses></TopRatedClasses>
            <PopularClasses></PopularClasses>
            

        </div>
    );
};

export default Home;