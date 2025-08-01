import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'animate.css';
interface Command {
  name: string;
  description: string;
  usage: string;
  example: string;
}
interface socail {
  i: string;
  link: string;
  txt: string;
}
@Component({
  selector: 'app-portfolio',
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio.html',
  styles: `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .typing {
      position: relative;
    }

    /* Smooth transitions */
    .suggestions, .command-details, .output {
      transition: all 0.3s ease-in-out;
    }

    .suggestion-item {
      transition: all 0.2s ease;
    }`,
  styleUrl: './portfolio.css',
})
export class Portfolio implements AfterViewInit {
  userInput: string = '';
  suggestions: Command[] = [];
  selectedCommand: Command | null = null;
  output: string = '';
  displayedOutput: string = '';
  isTyping: boolean = false;
  commnadNotfound = signal<string>('');
  // Define available commands
  commands: Command[] = [
    {
      name: 'skill',
      description: 'Display information about skills and abilities',
      usage: 'skill [skill-name]',
      example: 'skill javascript',
    },
    {
      name: 'about ',
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
      name: 'experince',
      description:
        'Display information about experince and project I have Done!',
      usage: 'experince [category]',
      example: 'experince',
    },
    {
      name: 'project',
      description: 'Display All project I have Done Base On My Experince!',
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
      example: 'profile',
    },
    {
      name: 'clear',
      description: 'Clear the terminal screen',
      usage: 'clear',
      example: 'clear',
    },
  ];
  @ViewChild('commandInput') commandInput!: ElementRef;

  ngAfterViewInit(): void {
    this.focusInput();
  }

  focusInput(): void {
    setTimeout(() => {
      this.commandInput?.nativeElement.focus();
    });
  }
  // Optional: Re-focus if user presses a key and input is not focused
  @HostListener('document:keydown')
  onKeydown(): void {
    if (document.activeElement !== this.commandInput?.nativeElement) {
      this.focusInput();
    }
  }
  // Personal info and skills database
  personalInfo = {
    name: 'Bun Sengtri',
    profession: 'Web Development',
    about:
      "I am a motivated and adaptable individual with a strong foundation in programming, graphic design, and communication. Currently pursuing a Bachelor's degree in Management Information Systems (MIS), I bring creativity, problem-solving abilities, and a commitment to excellence in every project. My experience includes developing websites, creating innovative designs, and collaborating effectively within teams to achieve goals. With a passion for technology and continuous learning, I aim to contribute my skills to drive impactful results in a dynamic work environment.",
  };
  experince: any = [
    {
      programming: {
        title: 'Programming',
        content1:
          'Experience In Year1 Setec Institude Web Development Building Ecommerce website using HTML CSS And JAVASCRIPT (burger Coffee Shop Bread Car Shop),Portfolio Website And Clone University Website (Aupp) Loan-System, Console StudentManagement Use cSharp',
        content2:
          'Experience In Year2 Setec Institude Web Development Building Loan-System(3wyas Principle ,LoginDegite(Dynamic) cSharp POS-System Integration with Sql-Server)',
      },
      graphic: {
        title: 'Graphic Design',
        content1:
          'Graphic Design: Design Many Poster Like: Smart Poster, Khmer New Years water Festival, Leaflet, UX/UI Phone ,Brochure ,Banner Name Card, Caltex Logo, Hotel Promotion Poster etc....',
      },
      content2: '',
    },
  ];

  skillsDatabase: any = [
    {
      'web-development': {
        title: 'Web Development',
        content:
          'Experienced in creating modern, responsive websites using various technologies. Skilled in both front-end and back-end development, with a focus on creating user-friendly interfaces and efficient functionality. Proficient in HTML, CSS, JavaScript, and modern frameworks. Always staying updated with the latest web development trends and best practices.',
      },
      programming: {
        title: 'Programming',
        content:
          'Strong foundation in programming concepts and multiple programming languages. Experience in problem-solving through code, developing efficient algorithms, and creating robust applications. Such as Csharp, C++ , JavaScript,Typescript And Morden Framework Like Angular, ReactJS.',
      },
      'graphic-design': {
        title: 'Graphic Design',
        content:
          'Creative approach to visual communication with experience in designing innovative and impactful graphics. Skilled in creating visual solutions that effectively communicate ideas and enhance user experience. Combining artistic creativity with technical skills to produce designs that are both aesthetically pleasing and functionally effective.',
      },
      'ux/ui design': {
        title: 'Ux/Ui Design',
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
    },
  ];
  projectInfo: any = [
    {
      pro1: {
        namepro: 'Bread Shop',
        link: 'https://github.com/sengtri457/BreadShop',
        visit: 'Visit Our Repositery',
      },
      pro2: {
        namepro: 'Coffee Shop',
        link: 'https://github.com/sengtri457/CoffeeKtri.github.io',
        visit: 'Visit Our Repositery',
      },
      pro3: {
        namepro: 'Hospital',
        link: 'https://github.com/sengtri457/hospital',
        visit: 'Visit Our Repositery',
      },
      pro4: {
        namepro: 'Car Shop',
        link: 'https://github.com/sengtri457/CarShop',
        visit: 'Visit Our Repositery',
      },
      pro5: {
        namepro: 'Water Shop',
        link: 'https://github.com/sengtri457/WaterShop',
        visit: 'Visit Our Repositery',
      },
      pro6: {
        namepro: 'Ai Demo',
        link: 'https://github.com/sengtri457/AI',
        visit: 'Visit Our Repositery',
      },
      pro7: {
        namepro: 'Consultain',
        link: 'https://github.com/sengtri457/bussnieus.github.io',
        visit: 'Visit Our Repositery',
      },
      pro8: {
        namepro: 'Aupp Clone',
        link: 'https://github.com/sengtri457/AuppClone',
        visit: 'https://aupp-clone.vercel.app/',
      },
      pro9: {
        namepro: 'Code Master',
        link: 'https://github.com/sengtri457/WebTeam',
        visit: 'https://web-team-ktri.vercel.app/',
      },
      pro10: {
        namepro: 'Ecommerce',
        link: 'https://github.com/sengtri457/EcommerceJs',
        visit: 'https://ecommerce-js-ktri.vercel.app/',
      },
      pro11: {
        namepro: 'Daily Tracking',
        link: 'https://daily-app-fjij.vercel.app/',
        visit: 'https://daily-app-fjij.vercel.app/',
      },
      pro12: {
        namepro: 'Loan System',
        link: 'https://github.com/sengtri457/LoanMidterm',
        visit: 'https://loan-midterm.vercel.app/aba',
      },
    },
  ];
  contactInfo = {
    email: 'sengtri457@gmail.com',
    phone: '+855 99 706 869',
    location: 'Phnom Penh, Cambodia',
    linkedin: 'https://www.linkedin.com/in/bun-sengtri-b71633357/',
    github: 'https://github.com/sengtri457',
  };

  onInputChange() {
    // debugger;

    const filterCategory = (this.suggestions = this.commands.filter((cmd) =>
      cmd.name.toLowerCase().includes(this.userInput.toLowerCase().trim())
    ));
    if (this.userInput.length > 0 && filterCategory.length > 0) {
      filterCategory;
      console.log(this.suggestions.length);
      console.log(this.userInput.length);
    } else {
      this.suggestions = [];
      this.selectedCommand = null;
      this.commnadNotfound.set(
        'Command Not Found Please type help to Display Command!!'
      );
    }
  }

  selectCommand(command: Command) {
    this.selectedCommand = command;
    this.userInput = command.name;
    this.suggestions = [];
  }
  // Add these properties to your component class
  isHtmlOutput: boolean = false;
  htmlOutput: string = '';
  // Contact form data
  contactForm = {
    name: '',
    email: '',
    message: '',
  };
  isContactFormVisible = false;
  executeCommand() {
    debugger;
    const parts = this.userInput.trim().split(' ');
    const command = parts[0].toLowerCase();
    const argument = parts[1]?.toLowerCase();

    this.output = '';
    this.displayedOutput = '';
    this.isTyping = false;
    this.htmlOutput = '';

    let outputText = '';

    switch (command) {
      case 'skill':
        debugger;
        this.isHtmlOutput = false;
        const skillsObj = this.skillsDatabase[0];
        outputText = Object.keys(skillsObj)
          .map(
            (key) =>
              `=== ${skillsObj[key].title} ===\n\n${skillsObj[key].content}\n`
          )
          .join('\n');
        break;

      case 'about':
        debugger;
        {
          outputText = `=== ${this.personalInfo.name} ===\n\nProfession: ${this.personalInfo.profession}\n\n${this.personalInfo.about}`;
        }
        break;

      case 'help':
        this.isHtmlOutput = false;
        if (argument) {
          const cmd = this.commands.find((c) => c.name === argument);
          if (cmd) {
            outputText = `=== ${cmd.name} ===\n\nDescription: ${cmd.description}\nUsage: ${cmd.usage}\nExample: ${cmd.example}`;
          } else {
            outputText = `Command "${argument}" not found.`;
          }
        } else {
          outputText =
            'Available commands:\n\n' +
            this.commands
              .map((cmd) => `${cmd.name} - ${cmd.description}`)
              .join('\n');
        }
        break;

      case 'experince':
        this.isHtmlOutput = false;
        const expObj = this.experince[0];
        outputText = Object.keys(expObj)
          .map(
            (key) =>
              `=== ${expObj[key].title} ===\n\n${expObj[key].content1}\n\n${expObj[key].content2}\n`
          )
          .join('\n');
        break;

      case 'project':
        // Special handling for projects with links
        this.isHtmlOutput = true;
        const proObj = this.projectInfo[0];
        // Create a structured output for projects
        let projectsText = '=== MY PROJECTS ===\n\n';
        let projectsHtml =
          '<div class="projects-container"><h3>=== MY PROJECTS ===</h3>';
        Object.keys(proObj).forEach((key, index) => {
          const project = proObj[key];
          projectsText += `${index + 1}. ${project.namepro}\n   Repository: ${
            project.link
          }\n   ${project.visit}\n\n`;
          projectsHtml += [
            '<div class="project-item">',
            `<h4>${index + 1}. ${project.namepro}</h4>`,
            `<p>Repository: <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">${project.link}</a></p>`,
            `<p class="visit-text">Visit Us: <a href="${project.visit}" target="_blank" rel="noopener noreferrer" class="project-link">${project.visit}</a></p>`,
            '</div>',
          ].join('');
        });
        projectsHtml += '</div>';
        this.output = projectsText;
        this.htmlOutput = projectsHtml;
        this.typeWriterWithHtml(projectsText);
        return;
      case 'profile':
        outputText = `=== ${this.personalInfo.name} ===\n\nProfession: ${this.personalInfo.profession}\n\n${this.personalInfo.about}`;
        break;
      case 'contact':
        // Special handling for contact with form
        this.isHtmlOutput = true;
        this.isContactFormVisible = true;

        let contactText = '=== CONTACT INFORMATION ===\n\n';
        contactText += `Email: ${this.contactInfo.email}\n`;
        contactText += `Phone: ${this.contactInfo.phone}\n`;
        contactText += `Location: ${this.contactInfo.location}\n`;
        contactText += `LinkedIn: ${this.contactInfo.linkedin}\n`;
        contactText += `GitHub: ${this.contactInfo.github}\n\n`;
        contactText += 'Contact form will appear below...';

        let contactHtml = [
          '<div class="contact-container">',
          '<h3>=== CONTACT INFORMATION ===</h3>',
          '<div class="contact-info">',
          `<p><i class="fas fa-envelope contact-icon"></i> Email: <a href="mailto:${this.contactInfo.email}" class="contact-link">${this.contactInfo.email}</a></p>`,
          `<p><i class="fas fa-phone contact-icon"></i> Phone: <a href="tel:${this.contactInfo.phone}" class="contact-link">${this.contactInfo.phone}</a></p>`,
          `<p><i class="fas fa-map-marker-alt contact-icon"></i> Location: ${this.contactInfo.location}</p>`,
          `<p><i class="fab fa-linkedin contact-icon"></i> LinkedIn: <a href="${this.contactInfo.linkedin}" target="_blank" class="contact-link">View Profile</a></p>`,
          `<p><i class="fab fa-github contact-icon"></i> GitHub: <a href="${this.contactInfo.github}" target="_blank" class="contact-link">View Profile</a></p>`,
          '</div>',
          '</div>',
        ].join('');

        this.output = contactText;
        this.htmlOutput = contactHtml;
        this.typeWriterWithHtml(contactText);
        return;
      case 'clear':
        this.displayedOutput = '';
        this.userInput = '';
        this.selectedCommand = null;
        this.suggestions = [];
        this.isTyping = false;
        return;

      default:
        if (this.userInput.trim()) {
          outputText = `Command "${command}" not found. Type "help" to see available commands.`;
        }
        return;
    }

    if (outputText) {
      this.output = outputText;
      this.typeWriter(outputText);
    }
  }
  typeWriterWithHtml(text: string, index: number = 0, speed: number = 30) {
    this.isTyping = true;
    this.displayedOutput = '';

    const type = () => {
      if (index < text.length) {
        this.displayedOutput += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        this.isTyping = false;
        setTimeout(() => {
          this.displayedOutput = '';
        }, 200);
      }
    };

    type();
  }
  typeWriter(text: string, index: number = 0, speed: number = 30) {
    this.isTyping = true;
    this.displayedOutput = '';

    const type = () => {
      if (index < text.length) {
        this.displayedOutput += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        this.isTyping = false;
      }
    };

    type();
  }

  ListSocail: socail[] = [
    {
      i: 'fa-brands fa-github',
      link: 'https://github.com/sengtri457',
      txt: 'GitHub',
    },
    {
      i: 'fa-brands fa-instagram',
      link: 'https://www.instagram.com/extra_s4ngtr1/',
      txt: 'Instagram',
    },
    {
      i: 'fa-brands fa-linkedin',
      link: 'https://www.linkedin.com/in/bun-sengtri-b71633357/',
      txt: 'LinkIn',
    },
    {
      i: 'fa-brands fa-facebook',
      link: 'https://web.facebook.com/sxng.tri457',
      txt: 'Facebook',
    },
  ];
  resetContactForm() {
    this.contactForm = {
      name: '',
      email: '',
      message: '',
    };
  }

  submitContactForm() {
    if (this.isContactFormValid()) {
      // Here you would typically send the form data to your backend
      console.log('Contact form submitted:', this.contactForm);

      // Show success message
      const successHtml = [
        '<div class="contact-success">',
        '<h4>✅ Message Sent Successfully!</h4>',
        `<p>Thank you, ${this.contactForm.name}! I will get back to you soon.</p>`,
        "<p>Your message has been received and I'll respond within 24-48 hours.</p>",
        '</div>',
      ].join('');

      // Update the display with success message
      this.htmlOutput += successHtml;
      this.resetContactForm();
      this.isContactFormVisible = false;

      // You can integrate with email services like EmailJS here
      // Example: this.sendEmail(this.contactForm);
    } else {
      // Show validation errors
      const errorHtml = [
        '<div class="contact-error">',
        '<h4>❌ Please fill in all required fields</h4>',
        '</div>',
      ].join('');

      this.htmlOutput = this.htmlOutput.replace('</div>', errorHtml + '</div>');
    }
  }

  isContactFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.message.trim()
    );
  }

  cancelContactForm() {
    this.isContactFormVisible = false;
    this.resetContactForm();
  }
}
