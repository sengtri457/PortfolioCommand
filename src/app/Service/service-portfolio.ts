import { Injectable } from '@angular/core';
import { Command, Social } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class ServicePortfolio {
  getAvailableCommands(): Command[] {
    return [
      {
        name: 'skill',
        description: 'Display information about skills and abilities',
        usage: 'skill [skill-name]',
        example: 'skill javascript',
      },
      {
        name: 'about',
        description: 'Show general information about topics',
        usage: 'about [topic]',
        example: 'about programming',
      },
      {
        name: 'help',
        description: 'Display help information and available commands',
        usage: 'help [command]',
        example: 'help skill',
      },
      {
        name: 'experience',
        description:
          'Display information about experience and projects I have done!',
        usage: 'experience [category]',
        example: 'experience',
      },
      {
        name: 'project',
        description: 'Display all projects I have done based on my experience!',
        usage: 'project [query]',
        example: 'project angular',
      },
      {
        name: 'profile',
        description: 'Display personal profile information',
        usage: 'profile',
        example: 'profile',
      },
      {
        name: 'contact',
        description:
          'Feel free to reach out for any inquiries, collaborations, or opportunities.',
        usage: 'contact',
        example: 'contact',
      },
      {
        name: 'clear',
        description: 'Clear the terminal screen',
        usage: 'clear',
        example: 'clear',
      },
      {
        name: 'exit',
        description: 'Clear the terminal screen',
        usage: 'clear',
        example: 'clear',
      },
    ];
  }
  getPersonalInfo() {
    return {
      name: 'Bun Sengtri',
      profession: 'Web Development',
      about:
        "I am a motivated and adaptable individual with a strong foundation in programming, graphic design, and communication. Currently pursuing a Bachelor's degree in Management Information Systems (MIS), I bring creativity, problem-solving abilities, and a commitment to excellence in every project. My experience includes developing websites, creating innovative designs, and collaborating effectively within teams to achieve goals. With a passion for technology and continuous learning, I aim to contribute my skills to drive impactful results in a dynamic work environment.",
    };
  }
  getSkillsDatabase() {
    return {
      'web-development': {
        title: 'Web Development',
        content:
          'Experienced in creating modern, responsive websites using various technologies. Skilled in both front-end and back-end development, with a focus on creating user-friendly interfaces and efficient functionality. Proficient in HTML, CSS, JavaScript, and modern frameworks. Always staying updated with the latest web development trends and best practices.',
      },
      programming: {
        title: 'Programming',
        content:
          'Strong foundation in programming concepts and multiple programming languages. Experience in problem-solving through code, developing efficient algorithms, and creating robust applications. Such as Csharp, C++, JavaScript, Typescript And Modern Framework Like Angular, ReactJS.',
      },
      'graphic-design': {
        title: 'Graphic Design',
        content:
          'Creative approach to visual communication with experience in designing innovative and impactful graphics. Skilled in creating visual solutions that effectively communicate ideas and enhance user experience. Combining artistic creativity with technical skills to produce designs that are both aesthetically pleasing and functionally effective.',
      },
      'ux/ui design': {
        title: 'UX/UI Design',
        content:
          'Solid understanding of UI/UX principles with practical experience in designing user-friendly interfaces. Proficient in tools like Figma and Adobe XD for creating wireframes, prototypes, and clean visual designs that enhance user experience.',
      },
      database: {
        title: 'Database',
        content:
          'Strong foundation in database concepts and hands-on experience with both relational and non-relational databases. Skilled in designing, querying, and managing data efficiently using MySQL and MongoDB. Capable of optimizing database performance and integrating data systems into robust applications.',
      },
      communication: {
        title: 'Communication',
        content:
          'Excellent communication skills enabling effective collaboration within teams and clear presentation of ideas. Able to translate technical concepts for different audiences and facilitate productive discussions. Strong interpersonal skills that contribute to successful team dynamics and project outcomes.',
      },
      mis: {
        title: 'Management Information Systems',
        content:
          "Currently pursuing a Bachelor's degree in Management Information Systems, gaining comprehensive knowledge of how technology can be leveraged to solve business problems. Learning about systems analysis, database management, project management, and the intersection of business and technology.",
      },
    };
  }
  getExperienceData() {
    return {
      programming: {
        title: 'Programming',
        content1:
          'Experience In Year1 Setec Institute Web Development Building Ecommerce website using HTML CSS And JAVASCRIPT (burger Coffee Shop Bread Car Shop), Portfolio Website And Clone University Website (Aupp) Loan-System, Console StudentManagement Use cSharp',
        content2:
          'Experience In Year2 Setec Institute Web Development Building Loan-System(3ways Principle, LoginDigit(Dynamic) cSharp POS-System Integration with Sql-Server)',
      },
      graphic: {
        title: 'Graphic Design',
        content1:
          'Graphic Design: Design Many Poster Like: Smart Poster, Khmer New Years water Festival, Leaflet, UX/UI Phone, Brochure, Banner Name Card, Caltex Logo, Hotel Promotion Poster etc....',
        content2: '',
      },
    };
  }

  getProjectData() {
    return {
      pro1: {
        name: 'Bread Shop',
        link: 'https://github.com/sengtri457/BreadShop',
        visit: 'Visit Our Repository',
      },
      pro2: {
        name: 'Coffee Shop',
        link: 'https://github.com/sengtri457/CoffeeKtri.github.io',
        visit: 'Visit Our Repository',
      },
      pro3: {
        name: 'Hospital',
        link: 'https://github.com/sengtri457/hospital',
        visit: 'Visit Our Repository',
      },
      pro4: {
        name: 'Car Shop',
        link: 'https://github.com/sengtri457/CarShop',
        visit: 'Visit Our Repository',
      },
      pro5: {
        name: 'Water Shop',
        link: 'https://github.com/sengtri457/WaterShop',
        visit: 'Visit Our Repository',
      },
      pro6: {
        name: 'AI Demo',
        link: 'https://github.com/sengtri457/AI',
        visit: 'Visit Our Repository',
      },
      pro7: {
        name: 'Consultant',
        link: 'https://github.com/sengtri457/bussnieus.github.io',
        visit: 'Visit Our Repository',
      },
      pro8: {
        name: 'Aupp Clone',
        link: 'https://github.com/sengtri457/AuppClone',
        visit: 'https://aupp-clone.vercel.app/',
      },
      pro9: {
        name: 'Code Master',
        link: 'https://github.com/sengtri457/WebTeam',
        visit: 'https://web-team-ktri.vercel.app/',
      },
      pro10: {
        name: 'Ecommerce',
        link: 'https://github.com/sengtri457/EcommerceJs',
        visit: 'https://ecommerce-js-ktri.vercel.app/',
      },
      pro11: {
        name: 'Daily Tracking',
        link: 'https://daily-app-fjij.vercel.app/',
        visit: 'https://daily-app-fjij.vercel.app/',
      },
      pro12: {
        name: 'Loan System',
        link: 'https://github.com/sengtri457/LoanMidterm',
        visit: 'https://loan-midterm.vercel.app/aba',
      },
    };
  }

  getContactInfo() {
    return {
      email: 'sengtri457@gmail.com',
      phone: '+855 99 706 869',
      location: 'Phnom Penh, Cambodia',
      linkedin: 'https://www.linkedin.com/in/bun-sengtri-b71633357/',
      github: 'https://github.com/sengtri457',
    };
  }

  getSocialLinks(): Social[] {
    return [
      {
        icon: 'fa-brands fa-github',
        link: 'https://github.com/sengtri457',
        name: 'GitHub',
      },
      {
        icon: 'fa-brands fa-instagram',
        link: 'https://www.instagram.com/extra_s4ngtr1/',
        name: 'Instagram',
      },
      {
        icon: 'fa-brands fa-linkedin',
        link: 'https://www.linkedin.com/in/bun-sengtri-b71633357/',
        name: 'LinkedIn',
      },
      {
        icon: 'fa-brands fa-facebook',
        link: 'https://web.facebook.com/sxng.tri457',
        name: 'Facebook',
      },
    ];
  }
}
