import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFont, faHouse, faRightFromBracket, faSignsPost, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import '../User/UserSiderbar.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Image/mainlogo.png'

export default function UserSiderbar() {
    const navigate = useNavigate('')

    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const mainRef = useRef(null);
    const linkRefs = useRef([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };
    const linkColor = (link) => {
        linkRefs.current.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    };

    const handlelogout = () => {
        localStorage.removeItem('Login')
        navigate('/login')
    }


    useEffect(() => {
        const handleLinkClick = (event) => {
            linkColor(event.target);
        };

        if (toggleRef.current) {
            toggleRef.current.addEventListener('click', toggleSidebar);
        }

        linkRefs.current.forEach(l => l.addEventListener('click', handleLinkClick));

        return () => {
            if (toggleRef.current) {
                toggleRef.current.removeEventListener('click', toggleSidebar);
            }
            linkRefs.current.forEach(l => l.removeEventListener('click', handleLinkClick));
        };
    }, []);
    return (
        <div className={`wrapper ${sidebarOpen ? 'show-sidebar' : ''}`} style={{ overflow: 'hidden' }}>


            <header className="header">
                <div className="header__container">
                    <button ref={toggleRef} className=' header__toggle'>
                        <FontAwesomeIcon icon={faBars} className='fs-3' />
                    </button>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`} id="sidebar" ref={sidebarRef}>

                <nav className="sidebar__container text-center">
                    <div class="sidebar__logo" >
                        <img src={logo} alt="!.." width={150} style={{ marginLeft: '58px' }} />
                    </div>
                    <div className="sidebar__content">
                        <div className="sidebar__list">

                            <Link to={'/'} className="sidebar__link link" >
                                <FontAwesomeIcon className='ri-home-5-line' icon={faHouse} />
                                <span class="sidebar__link-name">Home</span>
                                <span class="sidebar__link-floating">Home</span>
                            </Link>


                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}
