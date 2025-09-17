import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export interface Alumni {
  id: string;
  full_name: string;
  email: string;
  graduation_year: number;
  current_position: string;
  current_company: string;
  location: string;
  bio: string;
  skills: string[];
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  avatar_url?: string;
  years_of_experience: number;
}

// Fake alumni data
const fakeAlumniData: Alumni[] = [
  {
    id: '1',
    full_name: 'Rajesh Kumar',
    email: 'rajesh@techcorp.com',
    graduation_year: 2010,
    current_position: 'Senior Software Engineer',
    current_company: 'TechCorp Solutions',
    location: 'Bangalore, India',
    bio: 'Passionate about full-stack development and mentoring junior developers',
    skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    linkedin_url: 'https://linkedin.com/in/rajeshkumar',
    years_of_experience: 12
  },
  {
    id: '2',
    full_name: 'Priya Sharma',
    email: 'priya@aiinnovations.com',
    graduation_year: 2012,
    current_position: 'Data Scientist',
    current_company: 'AI Innovations Ltd',
    location: 'Mumbai, India',
    bio: 'AI/ML enthusiast working on cutting-edge machine learning solutions',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
    linkedin_url: 'https://linkedin.com/in/priyasharma',
    years_of_experience: 10
  },
  {
    id: '3',
    full_name: 'Vikram Singh',
    email: 'vikram@startupxyz.com',
    graduation_year: 2008,
    current_position: 'Product Manager',
    current_company: 'StartupXYZ',
    location: 'Gurgaon, India',
    bio: 'Product strategy expert with experience in scaling startups',
    skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile'],
    linkedin_url: 'https://linkedin.com/in/vikramsingh',
    years_of_experience: 15
  },
  {
    id: '4',
    full_name: 'Anita Verma',
    email: 'anita@microsoftindia.com',
    graduation_year: 2015,
    current_position: 'Cloud Architect',
    current_company: 'Microsoft India',
    location: 'Hyderabad, India',
    bio: 'Cloud computing specialist helping enterprises migrate to Azure',
    skills: ['Azure', 'DevOps', 'Kubernetes', 'Terraform'],
    linkedin_url: 'https://linkedin.com/in/anitaverma',
    years_of_experience: 8
  },
  {
    id: '5',
    full_name: 'Arjun Patel',
    email: 'arjun@google.com',
    graduation_year: 2013,
    current_position: 'Software Engineer',
    current_company: 'Google',
    location: 'Mountain View, USA',
    bio: 'Building next-generation search algorithms at Google',
    skills: ['Go', 'Java', 'Distributed Systems', 'Machine Learning'],
    linkedin_url: 'https://linkedin.com/in/arjunpatel',
    years_of_experience: 10
  },
  {
    id: '6',
    full_name: 'Kavita Reddy',
    email: 'kavita@amazon.com',
    graduation_year: 2011,
    current_position: 'Engineering Manager',
    current_company: 'Amazon',
    location: 'Seattle, USA',
    bio: 'Leading large-scale distributed systems at Amazon Web Services',
    skills: ['Java', 'AWS', 'System Design', 'Team Leadership'],
    linkedin_url: 'https://linkedin.com/in/kavitareddy',
    years_of_experience: 12
  },
  {
    id: '7',
    full_name: 'Rohit Gupta',
    email: 'rohit@flipkart.com',
    graduation_year: 2009,
    current_position: 'VP Engineering',
    current_company: 'Flipkart',
    location: 'Bangalore, India',
    bio: 'Scaling e-commerce platforms to serve millions of users',
    skills: ['Microservices', 'Scala', 'Kafka', 'Leadership'],
    linkedin_url: 'https://linkedin.com/in/rohitgupta',
    years_of_experience: 14
  },
  {
    id: '8',
    full_name: 'Sneha Agarwal',
    email: 'sneha@uber.com',
    graduation_year: 2016,
    current_position: 'Senior Data Scientist',
    current_company: 'Uber',
    location: 'San Francisco, USA',
    bio: 'Working on machine learning models for ride-sharing optimization',
    skills: ['Python', 'R', 'Spark', 'Deep Learning'],
    linkedin_url: 'https://linkedin.com/in/snehaagarwal',
    years_of_experience: 7
  },
  {
    id: '9',
    full_name: 'Amit Jain',
    email: 'amit@zomato.com',
    graduation_year: 2014,
    current_position: 'CTO',
    current_company: 'Zomato',
    location: 'Delhi, India',
    bio: 'Building technology solutions for food delivery at scale',
    skills: ['Node.js', 'React', 'MongoDB', 'Redis'],
    linkedin_url: 'https://linkedin.com/in/amitjain',
    years_of_experience: 9
  },
  {
    id: '10',
    full_name: 'Divya Mehta',
    email: 'divya@netflix.com',
    graduation_year: 2017,
    current_position: 'Software Engineer',
    current_company: 'Netflix',
    location: 'Los Angeles, USA',
    bio: 'Developing content recommendation algorithms for Netflix',
    skills: ['Python', 'Java', 'Kafka', 'Cassandra'],
    linkedin_url: 'https://linkedin.com/in/divyamehta',
    years_of_experience: 6
  },
  {
    id: '11',
    full_name: 'Ravi Sharma',
    email: 'ravi@paytm.com',
    graduation_year: 2012,
    current_position: 'Senior Product Manager',
    current_company: 'Paytm',
    location: 'Noida, India',
    bio: 'Leading fintech product development for digital payments',
    skills: ['Product Management', 'Fintech', 'Analytics', 'UX'],
    linkedin_url: 'https://linkedin.com/in/ravisharma',
    years_of_experience: 11
  },
  {
    id: '12',
    full_name: 'Pooja Malhotra',
    email: 'pooja@salesforce.com',
    graduation_year: 2018,
    current_position: 'Cloud Solutions Architect',
    current_company: 'Salesforce',
    location: 'San Francisco, USA',
    bio: 'Helping enterprises adopt cloud-first strategies',
    skills: ['Salesforce', 'Cloud Architecture', 'APIs', 'Integration'],
    linkedin_url: 'https://linkedin.com/in/poojamalhotra',
    years_of_experience: 5
  },
  {
    id: '13',
    full_name: 'Karan Chopra',
    email: 'karan@swiggy.com',
    graduation_year: 2015,
    current_position: 'Lead Developer',
    current_company: 'Swiggy',
    location: 'Bangalore, India',
    bio: 'Building real-time logistics and delivery systems',
    skills: ['React Native', 'Node.js', 'MySQL', 'Redis'],
    linkedin_url: 'https://linkedin.com/in/karanchopra',
    years_of_experience: 8
  },
  {
    id: '14',
    full_name: 'Nisha Thakur',
    email: 'nisha@adobe.com',
    graduation_year: 2019,
    current_position: 'UX Engineer',
    current_company: 'Adobe',
    location: 'Bangalore, India',
    bio: 'Creating intuitive user experiences for creative software',
    skills: ['JavaScript', 'React', 'Design Systems', 'Figma'],
    linkedin_url: 'https://linkedin.com/in/nishathakur',
    years_of_experience: 4
  },
  {
    id: '15',
    full_name: 'Sanjay Kumar',
    email: 'sanjay@tesla.com',
    graduation_year: 2010,
    current_position: 'Autopilot Engineer',
    current_company: 'Tesla',
    location: 'Palo Alto, USA',
    bio: 'Working on autonomous driving technology',
    skills: ['C++', 'Python', 'Computer Vision', 'Deep Learning'],
    linkedin_url: 'https://linkedin.com/in/sanjaykumar',
    years_of_experience: 13
  },
  {
    id: '16',
    full_name: 'Megha Joshi',
    email: 'megha@byju.com',
    graduation_year: 2016,
    current_position: 'Full Stack Developer',
    current_company: 'BYJU\'S',
    location: 'Bangalore, India',
    bio: 'Building educational technology platforms for millions of students',
    skills: ['React', 'Django', 'PostgreSQL', 'Docker'],
    linkedin_url: 'https://linkedin.com/in/meghajoshi',
    years_of_experience: 7
  },
  {
    id: '17',
    full_name: 'Arun Tiwari',
    email: 'arun@razorpay.com',
    graduation_year: 2013,
    current_position: 'DevOps Engineer',
    current_company: 'Razorpay',
    location: 'Bangalore, India',
    bio: 'Scaling payment infrastructure for Indian businesses',
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Monitoring'],
    linkedin_url: 'https://linkedin.com/in/aruntiwari',
    years_of_experience: 10
  },
  {
    id: '18',
    full_name: 'Ishita Bansal',
    email: 'ishita@ola.com',
    graduation_year: 2017,
    current_position: 'Data Analyst',
    current_company: 'Ola',
    location: 'Bangalore, India',
    bio: 'Analyzing transportation data to improve rider experience',
    skills: ['SQL', 'Python', 'Tableau', 'Statistics'],
    linkedin_url: 'https://linkedin.com/in/ishitabansal',
    years_of_experience: 6
  },
  {
    id: '19',
    full_name: 'Mohit Agrawal',
    email: 'mohit@freshworks.com',
    graduation_year: 2014,
    current_position: 'Backend Engineer',
    current_company: 'Freshworks',
    location: 'Chennai, India',
    bio: 'Building customer experience software solutions',
    skills: ['Ruby on Rails', 'PostgreSQL', 'Redis', 'ElasticSearch'],
    linkedin_url: 'https://linkedin.com/in/mohitagrawal',
    years_of_experience: 9
  },
  {
    id: '20',
    full_name: 'Ritu Singh',
    email: 'ritu@github.com',
    graduation_year: 2020,
    current_position: 'Software Engineer',
    current_company: 'GitHub',
    location: 'Remote',
    bio: 'Contributing to the world\'s largest code repository platform',
    skills: ['Ruby', 'JavaScript', 'Git', 'Open Source'],
    linkedin_url: 'https://linkedin.com/in/rituslngh',
    years_of_experience: 3
  }
];

export function useAlumni() {
  const { toast } = useToast();
  const [alumni, setAlumni] = useState<Alumni[]>(fakeAlumniData);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>(fakeAlumniData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchAlumni = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredAlumni(alumni);
      return;
    }

    const filtered = alumni.filter(person => 
      person.full_name.toLowerCase().includes(query.toLowerCase()) ||
      person.current_company.toLowerCase().includes(query.toLowerCase()) ||
      person.current_position.toLowerCase().includes(query.toLowerCase()) ||
      person.location.toLowerCase().includes(query.toLowerCase()) ||
      person.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredAlumni(filtered);
  };

  const filterByCategory = (category: string) => {
    let filtered = alumni;
    
    switch(category) {
      case 'tech':
        filtered = alumni.filter(person => 
          person.skills.some(skill => 
            ['React', 'Node.js', 'Python', 'Java', 'JavaScript'].includes(skill)
          )
        );
        break;
      case 'bangalore':
        filtered = alumni.filter(person => 
          person.location.toLowerCase().includes('bangalore')
        );
        break;
      case 'entrepreneurs':
        filtered = alumni.filter(person => 
          ['CTO', 'VP', 'Founder', 'CEO'].some(title => 
            person.current_position.includes(title)
          )
        );
        break;
      case 'ai-ml':
        filtered = alumni.filter(person => 
          person.skills.some(skill => 
            ['Machine Learning', 'AI', 'TensorFlow', 'PyTorch', 'Deep Learning'].includes(skill)
          )
        );
        break;
      default:
        filtered = alumni;
    }
    
    setFilteredAlumni(filtered);
  };

  return {
    alumni: filteredAlumni,
    loading,
    searchQuery,
    searchAlumni,
    filterByCategory
  };
}