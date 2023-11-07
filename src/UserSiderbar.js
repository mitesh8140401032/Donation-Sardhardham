import React, { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './UserSiderbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { Eng, Guj } from './HandleLanuage';
import { MyContext } from './ContextProvider';

import logo from './Mitesh.png'
export default function UserSiderbar() {
    const navigate = useNavigate('')
    const { lang, setLang } = useContext(MyContext);
    const [change, setChange] = useState(lang);
    console.log(change)
    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    // const mainRef = useRef(null);
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

    const handleToggle = () => {
        const newLang = lang === 'Eng' ? 'Guj' : 'Eng';
        setChange(newLang);
        setLang(newLang);
    };
    const languageData = lang === 'Eng' ? Eng : Guj;
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

                    <div style={{ float: 'right' }}>
                        <div class="toggle-button-cover">
                            <div class="button-cover">
                                <div class="button r" id="button-1">
                                    <input type="checkbox" className="checkbox" onClick={handleToggle} />

                                    <div class="knobs"></div>
                                    <div class="layer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`sidebar ${sidebarOpen ? 'show-sidebar' : ''}`} id="sidebar" ref={sidebarRef}>

                <nav className="">

                    <div className="sidebar__content">
                        <div className="sidebar__list">
                            <Link to={'/dashboard/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />
                                <span className="sidebar__link-name">{languageData.dashboard} </span>

                            </Link>
                            <Link to={'/income/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />

                                <span className="sidebar__link-name">{languageData.income} </span>


                            </Link>
                            <Link to={'/expenses/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />


                                <span className="sidebar__link-name">{languageData.expenses} </span>


                            </Link><Link to={'/doner-party/' + loginId} className="sidebar__link link" >
                                <img src={logo} alt="!.." width={20} height={20} />


                                <span className="sidebar__link-name">{languageData.donerparty} </span>


                            </Link>




                            <span onClick={handlelogout} className='sidebar__link link'>
                                <img src={logo} alt="!.." width={20} height={20} />


                                <span className="sidebar__link-name">{languageData.logout}</span>

                            </span>
                        </div>
                    </div>
                </nav>
            </div>

        </div>
    )
}
