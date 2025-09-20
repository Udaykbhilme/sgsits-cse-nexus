-- SGSITS Alumni+ Database Schema
-- Role-based authentication and messaging system

-- Users table with role-based authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'student', 'alumni', 'faculty')),
    batch_year VARCHAR(10),
    student_id VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_documents JSONB, -- Store document metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin credentials (fixed)
INSERT INTO users (email, password_hash, full_name, role, is_verified) 
VALUES ('admin1952@sgsits.com', '$2a$10$encrypted_password_hash', 'Admin User', 'admin', TRUE);

-- Messages table for the messaging system
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    batch VARCHAR(10), -- For batch messages
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('individual', 'batch')),
    is_read BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE, -- For batch messages
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    announcement_type VARCHAR(50) NOT NULL CHECK (announcement_type IN ('event', 'announcement', 'webinar')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Support requests table (for student laptop requests, etc.)
CREATE TABLE support_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    request_type VARCHAR(100) NOT NULL, -- e.g., 'laptop_request', 'financial_aid'
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Faculty who verified
    documents JSONB, -- Store supporting documents
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Mentorship sessions table
CREATE TABLE mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    session_type VARCHAR(50) NOT NULL CHECK (session_type IN ('one_on_one', 'group', 'workshop')),
    scheduled_at TIMESTAMP,
    duration_minutes INTEGER DEFAULT 60,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    meeting_link VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Job postings table
CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(255),
    salary_range VARCHAR(100),
    job_type VARCHAR(50) CHECK (job_type IN ('full_time', 'part_time', 'internship', 'contract')),
    posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User profiles table (extended profile information)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    avatar_url VARCHAR(500),
    bio TEXT,
    current_position VARCHAR(255),
    current_company VARCHAR(255),
    location VARCHAR(255),
    years_of_experience INTEGER,
    skills TEXT[], -- Array of skills
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    website_url VARCHAR(500),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Email notifications table (for batch messages)
CREATE TABLE email_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_verified ON users(is_verified);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_batch ON messages(batch);
CREATE INDEX idx_announcements_active ON announcements(is_active);
CREATE INDEX idx_support_requests_status ON support_requests(status);
CREATE INDEX idx_mentorship_mentor ON mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_mentee ON mentorship_sessions(mentee_id);
CREATE INDEX idx_job_postings_active ON job_postings(is_active);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_support_requests_updated_at BEFORE UPDATE ON support_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorship_sessions_updated_at BEFORE UPDATE ON mentorship_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data (except admins)
CREATE POLICY users_select_policy ON users
    FOR SELECT USING (
        auth.uid() = id OR 
        (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    );

-- Users can only update their own data (except admins)
CREATE POLICY users_update_policy ON users
    FOR UPDATE USING (
        auth.uid() = id OR 
        (SELECT role FROM users WHERE id = auth.uid()) = 'admin'
    );

-- Messages policies
CREATE POLICY messages_select_policy ON messages
    FOR SELECT USING (
        sender_id = auth.uid() OR 
        receiver_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'faculty')
    );

CREATE POLICY messages_insert_policy ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'faculty')
    );

-- Support requests policies
CREATE POLICY support_requests_select_policy ON support_requests
    FOR SELECT USING (
        student_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'faculty')
    );

CREATE POLICY support_requests_insert_policy ON support_requests
    FOR INSERT WITH CHECK (
        student_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'faculty')
    );

-- Mentorship sessions policies
CREATE POLICY mentorship_sessions_select_policy ON mentorship_sessions
    FOR SELECT USING (
        mentor_id = auth.uid() OR 
        mentee_id = auth.uid() OR 
        (SELECT role FROM users WHERE id = auth.uid()) IN ('admin', 'faculty')
    );
