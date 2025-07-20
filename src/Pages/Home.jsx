import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/Banner';
import BeInstructor from '../components/BeInstructor';
import WebStats from '../components/WebStats';
import Partners from '../components/Partners';
import Feedbacks from '../components/Feedbacks';
import PopularClasses from '../components/PopularClasses';
import Footer from '../components/Footer/Footer';
import TopInstructor from '../components/TopInstructor';
import StudentStories from '../components/StudentStories';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <BeInstructor></BeInstructor>
            <WebStats></WebStats>
            <PopularClasses></PopularClasses>
            <TopInstructor></TopInstructor>
            <Partners></Partners>
            <StudentStories></StudentStories>
           <Feedbacks></Feedbacks>
           <Footer></Footer>
           
            

        </div>
    );
};

export default Home;