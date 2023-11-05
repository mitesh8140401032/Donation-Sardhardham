import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFont, faHandHoldingDollar, faHouse, faRightFromBracket, faSignsPost, faSquarePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import './UserSiderbar.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from './Mitesh.png'
export default function UserSiderbar() {
    const navigate = useNavigate('')

    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const mainRef = useRef(null);
    const linkRefs = useRef([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginId, setLoginId] = useState('')

    const toggleSidebar = () => {
        setSidebarOpen(prevSidebarOpen => !prevSidebarOpen);
    };
    const linkColor = (link) => {
        linkRefs.current.forEach(l => l.classNameList.remove('active-link'));
        link.classNameList.add('active-link');
    };

    const handlelogout = () => {
        localStorage.removeItem('lid')
        navigate('/')
    }


    useEffect(() => {

        let url = window.location.href
        let Id = url.substring(url.lastIndexOf('/') + 1)
        setLoginId(Id)
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

                <nav className="">

                    <div className="sidebar__content">
                        <div className="sidebar__list">
                            <Link to={'/home/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />
                                <span className="sidebar__link-name">Dashboard </span>
                                <span className="sidebar__link-floating">Dashboard </span>
                            </Link>
                            <Link to={'/income/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />

                                <span className="sidebar__link-name">Income</span>

                            </Link>
                            <Link to={'/expenss/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />

                                <span className="sidebar__link-name">Expenses </span>

                            </Link><Link to={'/doner-party/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />

                                <span className="sidebar__link-name">Doner_Party </span>

                            </Link>




                            <span onClick={handlelogout} className='sidebar__link link'>
                                <img src={logo} alt="!.." width={20} height={20} />


                                <span className="sidebar__link-name">Logout</span>

                            </span>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}
