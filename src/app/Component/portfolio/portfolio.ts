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
      name: 'list',
      description: 'List all available items in a category',
      usage: 'list [category]',
      example: 'list skills',
    },
    {
      name: 'search',
      description: 'Search for specific information',
      usage: 'search [query]',
      example: 'search angular',
    },
    {
      name: 'profile',
      description: 'Display personal profile information',
      usage: 'profile',
      example: 'profile',
    },
    {
      name: 'clear',
      description: 'Clear the terminal screen',
      usage: 'clear',
      example: 'clear',
    },
  ];
  @ViewChild('hoverVideo') hoverVideo!: ElementRef<HTMLVideoElement>;
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

  skillsDatabase: any = {
    'web-development': {
      title: 'Web Development',
      content:
        'Experienced in creating modern, responsive websites using various technologies. Skilled in both front-end and back-end development, with a focus on creating user-friendly interfaces and efficient functionality. Proficient in HTML, CSS, JavaScript, and modern frameworks. Always staying updated with the latest web development trends and best practices.',
    },
    'graphic-design': {
      title: 'Graphic Design',
      content:
        'Creative approach to visual communication with experience in designing innovative and impactful graphics. Skilled in creating visual solutions that effectively communicate ideas and enhance user experience. Combining artistic creativity with technical skills to produce designs that are both aesthetically pleasing and functionally effective.',
    },
    programming: {
      title: 'Programming',
      content:
        'Strong foundation in programming concepts and multiple programming languages. Experience in problem-solving through code, developing efficient algorithms, and creating robust applications. Comfortable working with different programming paradigms and always eager to learn new technologies and improve coding skills.',
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
    javascript: {
      title: 'JavaScript',
      content:
        'JavaScript is a versatile programming language primarily used for web development. It enables interactive web pages and is essential for front-end development. Modern JavaScript (ES6+) includes features like arrow functions, promises, async/await, destructuring, and modules. It can also be used for server-side development with Node.js, mobile app development, and even desktop applications.',
    },
    angular: {
      title: 'Angular',
      content:
        'Angular is a powerful TypeScript-based web application framework developed by Google. It provides a complete solution for building large-scale applications with features like dependency injection, routing, forms handling, HTTP client, and testing utilities. Angular uses component-based architecture and follows the MVC pattern, making it ideal for enterprise-level applications.',
    },
  };

  onInputChange() {
    const filterCategory = (this.suggestions = this.commands.filter((cmd) =>
      cmd.name.toLowerCase().includes(this.userInput.toLowerCase())
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

  executeCommand() {
    const parts = this.userInput.trim().split(' ');
    const command = parts[0].toLowerCase();
    const argument = parts[1]?.toLowerCase();

    this.output = '';
    this.displayedOutput = '';
    this.isTyping = false;

    let outputText = '';

    switch (command) {
      case 'skill':
        if (argument && this.skillsDatabase[argument]) {
          const skill = this.skillsDatabase[argument];
          outputText = `=== ${skill.title} ===\n\n${skill.content}`;
        } else if (argument) {
          outputText = `Skill "${argument}" not found. Available skills: ${Object.keys(
            this.skillsDatabase
          ).join(', ')}`;
        } else {
          outputText = `Available skills: ${Object.keys(
            this.skillsDatabase
          ).join(', ')}\n\nUsage: skill [skill-name]`;
        }
        break;

      case 'about':
        if (argument) {
          // Check if it's asking about personal info
          if (
            argument === 'me' ||
            argument === 'profile' ||
            argument === 'info'
          ) {
            outputText = `=== ${this.personalInfo.name} ===\n\nProfession: ${this.personalInfo.profession}\n\n${this.personalInfo.about}`;
          } else {
            outputText = `About ${argument}:\n\nThis would contain general information about ${argument}. You can extend this with more detailed content as needed.`;
          }
        } else {
          outputText =
            'Please specify a topic. Usage: about [topic]\n\nTry: about me, about profile, about info';
        }
        break;

      case 'help':
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

      case 'list':
        if (argument === 'skills') {
          outputText =
            'Available skills:\n\n' +
            Object.keys(this.skillsDatabase)
              .map((skill) => `• ${skill}`)
              .join('\n');
        } else {
          outputText = 'Available categories: skills\n\nUsage: list [category]';
        }
        break;

      case 'search':
        if (argument) {
          const results = Object.keys(this.skillsDatabase).filter(
            (skill) =>
              skill.includes(argument) ||
              this.skillsDatabase[skill].content
                .toLowerCase()
                .includes(argument)
          );

          if (results.length > 0) {
            outputText =
              `Search results for "${argument}":\n\n` +
              results
                .map(
                  (skill) => `• ${skill} - ${this.skillsDatabase[skill].title}`
                )
                .join('\n');
          } else {
            outputText = `No results found for "${argument}"`;
          }
        } else {
          outputText = 'Please provide a search query. Usage: search [query]';
        }
        break;

      case 'profile':
        outputText = `=== ${this.personalInfo.name} ===\n\nProfession: ${this.personalInfo.profession}\n\n${this.personalInfo.about}`;
        break;

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
  playVideo(): void {
    this.hoverVideo.nativeElement.play();
  }

  pauseVideo(): void {
    this.hoverVideo.nativeElement.pause();
    this.hoverVideo.nativeElement.currentTime = 0; // reset to beginning if you want
  }

  ListSocail: socail[] = [
    {
      i: 'fa-brands fa-github',
      link: 'https://github.com/sengtri457',
      txt: 'GitHub',
    },
    {
      i: 'fa-brands fa-instagram',
      link: 'https://github.com/sengtri457',
      txt: 'Instagram',
    },
    {
      i: 'fa-brands fa-linkedin',
      link: 'https://github.com/sengtri457',
      txt: 'LinkIn',
    },
    {
      i: 'fa-brands fa-facebook',
      link: 'https://github.com/sengtri457',
      txt: 'Facebook',
    },
  ];
}
