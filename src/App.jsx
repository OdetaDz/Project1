import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/UI/Footer/Footer';
import Header from './components/UI/Header/Header';
import Main from './components/Pages/Main/Main';
import SignIn from './components/Pages/SignIn/SignIn';
import SignUp from './components/Pages/SignUp/SignUp';
import UsersProfile from './components/Pages/UsersProfile/UsersProfile';
import AllPosts from './components/Pages/AllPosts/AllPosts';
import SpecificPost from './components/Pages/SpecificPost/SpecificPost';
import AddNewPost from './components/Pages/AddNewPost/AddNewPost';
import EditPost from './components/Pages/EditPost/EditPost';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Main />} />
                <Route path="Users">
                    <Route path="SignIn" element={<SignIn />} />
                    <Route path="SignUp" element={<SignUp />} />
                    <Route path=":id" element={<UsersProfile />} />
                </Route>
                <Route path="Posts">
                    <Route path="All" element={<AllPosts/>} />
                    <Route path=":id" element={<SpecificPost />} />
                    <Route path="AddNew" element={<AddNewPost/>} />
                    <Route path="Edit/:id" element={<EditPost/>} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
