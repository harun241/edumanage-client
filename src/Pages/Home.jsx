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
import BlogSection from '../components/Blogs';
import FAQSection from '../components/FAQ';

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
            <BlogSection></BlogSection>
            <FAQSection></FAQSection>
           <Feedbacks></Feedbacks>
           <Footer></Footer>
           
            

        </div>
    );
};

export default Home;