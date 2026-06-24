import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from '../home/Home'
import About from '../about/About'
import EventsList from '../events/list/EventsList'
import AddEvent from '../events/form/AddEvent'
import UpdateEvent from '../events/form/UpdateEvent'

export default function Layout() {
    return (
        <>
            <header className="app-header">
                <Link to="/" className="app-logo-link">
                    <img src="/Event-Stack-Management-System-Logo.png" alt="Events Manager" className="app-logo" />
                </Link>
                <nav className="app-nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/events/add">Add Event</Link>
                </nav>
            </header>
            <main className="app-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/events" element={<EventsList />} />
                    <Route path="/events/add" element={<AddEvent />} />
                    <Route path="/events/update/:code" element={<UpdateEvent />} />
                </Routes>
            </main>
        </>
    )
}
