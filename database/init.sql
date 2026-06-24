CREATE DATABASE IF NOT EXISTS events_db;
USE events_db;

CREATE TABLE IF NOT EXISTS event_types (
    code VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    code CHAR(36) NOT NULL PRIMARY KEY,
    event_type_code VARCHAR(50) NOT NULL,
    start_datetime DATETIME NOT NULL,
    description VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    confirmed_attendees INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_type FOREIGN KEY (event_type_code) REFERENCES event_types(code) ON DELETE CASCADE ON UPDATE CASCADE
);

-- seed event types
INSERT INTO event_types (code, name) VALUES
    ('wedding', 'Wedding'),
    ('party', 'Party'),
    ('conference', 'Conference'),
    ('company_event', 'Company Event'),
    ('birthday', 'Birthday');

-- seed sample events
INSERT INTO events (code, event_type_code, start_datetime, description, address, confirmed_attendees) VALUES
    (UUID(), 'wedding', DATE_ADD(NOW(), INTERVAL 30 DAY), 'John and Jane wedding ceremony', 'Tel Aviv, HaYarkon 5', 120),
    (UUID(), 'conference', DATE_ADD(NOW(), INTERVAL 7 DAY), 'Annual Tech Summit 2026', 'Jerusalem Convention Center', 300),
    (UUID(), 'party', DATE_SUB(NOW(), INTERVAL 10 DAY), 'Summer beach party', 'Herzliya Marina', 80),
    (UUID(), 'birthday', DATE_ADD(NOW(), INTERVAL 14 DAY), 'David 30th birthday celebration', 'Ramat Gan, Bar St 12', 50),
    (UUID(), 'company_event', DATE_SUB(NOW(), INTERVAL 5 DAY), 'Q2 company all-hands meeting', 'Petah Tikva HiTech Park', 200);
