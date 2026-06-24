import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <div className="home-hero">
                <h2>Welcome to Events Manager</h2>
                <p>
                    A full-stack system for managing events of all kinds — weddings, parties, conferences, company gatherings, and more.
                    Browse upcoming and past events, add new ones, and keep everything organized in one place.
                </p>
            </div>
            <div className="home-links">
                <Link to="/events" className="home-card">
                    <h3>Browse Events</h3>
                    <p>View all events filtered by type. See which are upcoming and which have already passed.</p>
                </Link>
                <Link to="/events/add" className="home-card">
                    <h3>Add Event</h3>
                    <p>Create a new event with all required details including type, date, location, and attendees.</p>
                </Link>
                <Link to="/about" className="home-card">
                    <h3>About</h3>
                    <p>Learn more about this system and what it offers.</p>
                </Link>
            </div>
        </div>
    )
}
