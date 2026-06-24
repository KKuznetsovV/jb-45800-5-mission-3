import './About.css'

export default function About() {
    return (
        <div className="about">
            <h2>About Events Manager</h2>
            <section className="about-section">
                <h3>What is this system?</h3>
                <p>
                    Events Manager is a full-stack web application designed to help you manage events of all kinds.
                    Whether it's a wedding, a conference, a party, or a company event — this system keeps everything
                    organized and accessible.
                </p>
            </section>
            <section className="about-section">
                <h3>Features</h3>
                <ul>
                    <li>Browse events filtered by event type</li>
                    <li>See at a glance whether an event is upcoming or has already passed</li>
                    <li>Know exactly how many days remain until an upcoming event</li>
                    <li>Add new events with full validation</li>
                    <li>Update existing event details</li>
                    <li>Delete events you no longer need</li>
                </ul>
            </section>
            <section className="about-section">
                <h3>Tech Stack</h3>
                <ul>
                    <li><strong>Frontend:</strong> React + TypeScript (Vite)</li>
                    <li><strong>Backend:</strong> Node.js + Express + TypeScript</li>
                    <li><strong>Database:</strong> MySQL with Sequelize ORM</li>
                </ul>
            </section>
        </div>
    )
}
