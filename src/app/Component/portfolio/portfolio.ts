import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  signal,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'animate.css';

// Interfaces
interface Command {
  name: string;
  description: string;
  usage: string;
  example: string;
}

interface Social {
  icon: string;
  link: string;
  name: string;
}

interface CommandHistory {
  command: string;
  output: string;
  isHtml: boolean;
  htmlOutput?: string;
  timestamp: Date;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
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

    .cursor {
      animation: blink 1s infinite;
    }

    .suggestions, .command-details, .output {
      transition: all 0.3s ease-in-out;
    }

    .suggestion-item {
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .suggestion-item:hover {
      background-color: #2a2a2a;
    }

    .command-history {
      margin-bottom: 1rem;
    }

    .command-prompt {
      color: #00ff00;
      font-weight: bold;
    }

    .command-output {
      margin: 0.5rem 0;
      white-space: pre-wrap;
    }

    .terminal-container {
      background: #1a1a1a;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      padding: 1rem;
      border-radius: 5px;
      max-height: 500px;
      overflow-y: auto;
    }
  `,
  styleUrl: './portfolio.css',
})
export class Portfolio implements AfterViewInit, OnInit {
  // UI State
  userInput: string = '';
  suggestions: Command[] = [];
  selectedCommand: Command | null = null;
  output: string = '';
  displayedOutput: string = '';
  isTyping: boolean = false;
  isContactFormVisible: boolean = false;
  commandNotFound = signal<string>('');
  currentLanguage: 'en' | 'km' = 'en';

  languageChange(): string[] {
    const textMap: Record<'en' | 'km', string[]> = {
      en: [
        'help',
        'about',
        'project',
        'experience',
        'skill',
        'contact',
        'profile',
        'clear',
        'history',
      ],
      km: [
        'ជំនួយ',
        'អំពី',
        'គម្រោង',
        'បទពិសោធន៍',
        'ជំនាញ',
        'ទាក់ទង',
        'ប្រវត្តិរូប',
        'លុប',
        'ប្រវត្តិ',
      ],
    };
    return textMap[this.currentLanguage];
  }

  loading = signal<'loading' | 'active'>('loading');
  checkClassLoading(): void {
    setTimeout(() => {
      this.loading.update((up) => (up === 'active' ? 'loading' : 'active'));
    }, 300);
  }
  beforeCheck(): void {
    setTimeout(() => {
      this.loading.update((up) => (up === 'loading' ? 'active' : 'loading'));
    }, 300);
  }
  zeroEnglish() {
    const numberZero = {
      en: '0',
      km: '០',
    };
    return numberZero[this.currentLanguage];
  }
  oneEnglish() {
    const numberOne = {
      en: '1',
      km: '១',
    };
    return numberOne[this.currentLanguage];
  }
  imglogo() {
    const img = {
      en: '/img/eng.webp',
      km: '/img/khmer.webp',
    };
    return img[this.currentLanguage];
  }

  KhmerLanguaue() {
    if (this.currentLanguage == 'en') {
      setTimeout(() => {
        this.currentLanguage = 'km';
        this.checkClassLoading();
      }, 700);
      this.beforeCheck();
    } else {
      setTimeout(() => {
        this.currentLanguage = 'en';
        this.checkClassLoading();
      }, 700);
      this.beforeCheck();
    }
  }
  sofwareKhmer(): any {
    const softwareName = {
      en: 'software Developer',
      km: 'អ្នកអភិវឌ្ឍន៍កម្មវិធី',
    };
    return softwareName[this.currentLanguage];
  }
  profilesInfo(): any {
    const info = {
      en: 'Call : Ktri',
      km: 'ប៊ុន សេងទ្រី',
    };
    return info[this.currentLanguage];
  }
  textPro(): any {
    const info = {
      en: 'A Software Developer Who Build Innovative Solution with Code and Creativity.',
      km: 'អ្នកបង្កើតកម្មវិធីដែលបង្កើតដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិតជាមួយនឹងកូដ និងការច្នៃប្រឌិត',
    };
    return info[this.currentLanguage];
  }
  nameInterminal(): any {
    const info = {
      en: 'Hi, I am Bun Sengtri, a Lazy Developer',
      km: 'សួស្តី ខ្ញុំឈ្មោះ ប៊ុន សេងទ្រី អ្នកអភិវឌ្ឍន៍ខ្ជិល',
    };
    return info[this.currentLanguage];
  }
  availableInterminal(): any {
    const info = {
      en: 'Type help to see available commands or start exploring!',
      km: 'វាយ ជំនួយ ដើម្បីមើលពាក្យបញ្ជាដែលមាន ឬចាប់ផ្តើមរុករក!',
    };
    return info[this.currentLanguage];
  }
  massageInterminal(): any {
    const info = {
      en: 'Welcome to Bun Sengtri Portfolio Terminal! Type help to see available commands.Type about learn more about me.',
      km: 'សូមស្វាគមន៍មកកាន់ស្ថានីយផតថលប៊ុនសេងទ្រី! វាយបញ្ចូលជំនួយដើម្បីមើលពាក្យបញ្ជាដែលមាន វាយអំពីស្វែងយល់បន្ថែមអំពីខ្ញុំ',
    };
    return info[this.currentLanguage];
  }
  Interminal(): any {
    const info = {
      en: 'bunsengtri@portfolio:~$ ',
      km: '@ប៊ុនសេងទ្រី:~$ ',
    };
    return info[this.currentLanguage];
  }

  // Command history
  commandHistory: CommandHistory[] = [];
  currentPrompt: string = 'bunsengtri@portfolio:~$ ';

  // Contact form
  contactForm: ContactForm = {
    name: '',
    email: '',
    message: '',
  };

  @ViewChild('commandInput') commandInput!: ElementRef;
  @ViewChild('terminalContainer') terminalContainer!: ElementRef;

  // Constants
  private readonly TYPING_SPEED = 30;
  private readonly FOCUS_DELAY = 100;

  ngAfterViewInit(): void {
    this.focusInput();
    // this.addWelcomeMessage();
  }
  fullText = 'Bun Sengtri';

  displayedText = '';
  currentIndex = 0;

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    const typingSpeed = 100; // ms
    if (this.currentIndex < this.fullText.length) {
      this.displayedText += this.fullText[this.currentIndex];
      this.currentIndex++;
      setTimeout(() => this.typeText(), typingSpeed);
    }
  }

  // Event Handlers
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.isTyping) {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case 'Enter':
        this.executeCommand();
        break;
      case 'Tab':
        if (this.suggestions.length > 0) {
          event.preventDefault();
          this.selectCommand(this.suggestions[0]);
        }
        break;
      default:
        if (document.activeElement !== this.commandInput?.nativeElement) {
          this.focusInput();
        }
    }
  }

  onInputChange(): void {
    if (this.isTyping) return;

    this.updateSuggestions();
  }

  // Core Methods
  addWelcomeMessage(): void {
    const welcomeMessage = `Welcome to Bun Sengtri's Portfolio Terminal!
Type 'help' to see available commands.
Type 'about' to learn more about me.`;

    this.commandHistory.push({
      command: '',
      output: welcomeMessage,
      isHtml: false,
      timestamp: new Date(),
    });
  }

  private updateSuggestions(): void {
    const input = this.userInput.toLowerCase().trim();

    if (input.length === 0) {
      this.suggestions = [];
      this.commandNotFound.set('');
      return;
    }

    const matchingCommands = this.getAvailableCommands().filter((cmd) =>
      cmd.name.toLowerCase().includes(input)
    );

    if (matchingCommands.length > 0) {
      this.suggestions = matchingCommands;
      this.commandNotFound.set('');
    } else {
      this.suggestions = [];
      this.selectedCommand = null;
      this.commandNotFound.set(
        'Command Not Found! Please type "help" to display available commands.'
      );
    }
  }

  selectCommand(command: Command): void {
    this.selectedCommand = command;
    this.userInput = command.name;
    this.suggestions = [];
    this.focusInput();
  }

  executeCommand(): void {
    const trimmedInput = this.userInput.trim();
    if (!trimmedInput) return;

    const [command, ...args] = trimmedInput.split(' ');
    const commandName = command.toLowerCase();

    // Add command to history
    const historyEntry: CommandHistory = {
      command: `${this.currentPrompt}${trimmedInput}`,
      output: '',
      isHtml: false,
      timestamp: new Date(),
    };
    this.commandHistory.push(historyEntry);

    // Clear input
    this.clearInput();

    // Execute command
    const result = this.processCommand(commandName, args);

    if (result.output) {
      if (result.isHtml) {
        this.typeWriterWithHtml(
          result.output,
          historyEntry,
          result.htmlOutput || ''
        );
      } else {
        this.typeWriter(result.output, historyEntry);
      }
    } else {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  private processCommand(
    command: string,
    args: string[]
  ): { output: string; isHtml: boolean; htmlOutput?: string } {
    switch (command) {
      case 'skill':
        return { output: this.getSkillsOutput(), isHtml: false };

      case 'about':
        return { output: this.getAboutOutput(), isHtml: false };

      case 'help':
        return { output: this.getHelpOutput(args[0]), isHtml: false };

      case 'experience':
      case 'experince': // Handle typo
        return { output: this.getExperienceOutput(), isHtml: false };

      case 'project':
        const projectResult = this.getProjectOutput();
        return {
          output: projectResult.text,
          isHtml: true,
          htmlOutput: projectResult.html,
        };

      case 'profile':
        return { output: this.getProfileOutput(), isHtml: false };

      case 'contact':
        const contactResult = this.getContactOutput();
        this.isContactFormVisible = true;
        return {
          output: contactResult.text,
          isHtml: true,
          htmlOutput: contactResult.html,
        };

      case 'clear':
        this.clearTerminal();
        return { output: '', isHtml: false };

      default:
        return {
          output: `Command "${command}" not found. Type "help" to see available commands.`,
          isHtml: false,
        };
    }
  }

  // Command Output Methods
  private getSkillsOutput(): string {
    return Object.entries(this.getSkillsDatabase())
      .map(([_, skill]) => `=== ${skill.title} ===\n\n${skill.content}\n`)
      .join('\n');
  }

  private getAboutOutput(): string {
    const info = this.getPersonalInfo();
    return `=== ${info.name} ===\n\nProfession: ${info.profession}\n\n${info.about}`;
  }

  private getHelpOutput(commandName?: string): string {
    const commands = this.getAvailableCommands();

    if (commandName) {
      const cmd = commands.find((c) => c.name === commandName.toLowerCase());
      return cmd
        ? `=== ${cmd.name} ===\n\nDescription: ${cmd.description}\nUsage: ${cmd.usage}\nExample: ${cmd.example}`
        : `Command "${commandName}" not found.`;
    }

    return (
      'Available commands:\n\n' +
      commands
        .map((cmd) => `${cmd.name.padEnd(12)} - ${cmd.description}`)
        .join('\n')
    );
  }

  private getExperienceOutput(): string {
    return Object.entries(this.getExperienceData())
      .map(
        ([_, exp]) =>
          `=== ${exp.title} ===\n\n${exp.content1}\n\n${exp.content2 || ''}\n`
      )
      .join('\n');
  }

  private getProjectOutput(): { text: string; html: string } {
    const projects = this.getProjectData();
    let text = '=== MY PROJECTS ===\n\n';
    let html = '<div class="projects-container"><h3>=== MY PROJECTS ===</h3>';

    Object.entries(projects).forEach(([_, project], index) => {
      text += `${index + 1}. ${project.name}\n   Repository: ${
        project.link
      }\n   Visit: ${project.visit}\n\n`;
      html += `<div class="project-item">
<h4>${index + 1}. ${project.name}</h4>
<p>Repository: <a href="${
        project.link
      }" target="_blank" rel="noopener noreferrer" class="project-link">${
        project.link
      }</a></p>
<p class="visit-text">Visit: <a href="${
        project.visit
      }" target="_blank" rel="noopener noreferrer" class="project-link">${
        project.visit
      }</a></p>
</div>`;
    });

    html += '</div>';
    return { text, html };
  }

  private getProfileOutput(): string {
    const info = this.getPersonalInfo();
    return `=== ${info.name} ===\n\nProfession: ${info.profession}\n\n${info.about}`;
  }

  private getContactOutput(): { text: string; html: string } {
    const contact = this.getContactInfo();

    let text = '=== CONTACT INFORMATION ===\n\n';
    text += `Email: ${contact.email}\n`;
    text += `Phone: ${contact.phone}\n`;
    text += `Location: ${contact.location}\n`;
    text += `LinkedIn: ${contact.linkedin}\n`;
    text += `GitHub: ${contact.github}`;

    const html = `<div class="contact-container">
<h3>=== CONTACT INFORMATION ===</h3>
<div class="contact-info" data-aos="fade-up">
<p><i class="fas fa-envelope contact-icon"></i> Email: <a href="mailto:${contact.email}" class="contact-link">${contact.email}</a></p>
<p><i class="fas fa-phone contact-icon"></i> Phone: <a href="tel:${contact.phone}" class="contact-link">${contact.phone}</a></p>
<p><i class="fas fa-map-marker-alt contact-icon"></i> Location: ${contact.location}</p>
<p><i class="fab fa-linkedin contact-icon"></i> LinkedIn: <a href="${contact.linkedin}" target="_blank" class="contact-link">View Profile</a></p>
<p><i class="fab fa-github contact-icon"></i> GitHub: <a href="${contact.github}" target="_blank" class="contact-link">View Profile</a></p>
</div>
</div>`;

    return { text, html };
  }

  // Utility Methods
  private clearInput(): void {
    this.userInput = '';
    this.suggestions = [];
    this.selectedCommand = null;
    this.commandNotFound.set('');
    this.displayedOutput = '';
    this.output = '';
    this.isTyping = false;
    this.focusInput();
  }

  private clearTerminal(): void {
    this.commandHistory = [];
    this.isContactFormVisible = false;
    this.scrollToBottom();
  }

  private focusInput(): void {
    if (!this.isTyping) {
      setTimeout(() => {
        this.commandInput?.nativeElement.focus();
      }, this.FOCUS_DELAY);
    }
  }

  private scrollToBottom(): void {
    if (this.terminalContainer) {
      const element = this.terminalContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // Animation Methods
  private typeWriter(
    text: string,
    historyEntry: CommandHistory,
    index: number = 0
  ): void {
    this.isTyping = true;
    this.displayedOutput = '';

    const type = () => {
      if (index < text.length) {
        this.displayedOutput += text.charAt(index);
        index++;
        setTimeout(type, this.TYPING_SPEED);
      } else {
        this.finishTyping(historyEntry, text, false);
      }
    };

    type();
  }

  private typeWriterWithHtml(
    text: string,
    historyEntry: CommandHistory,
    htmlOutput: string,
    index: number = 0
  ): void {
    this.isTyping = true;
    this.displayedOutput = '';

    const type = () => {
      if (index < text.length) {
        this.displayedOutput += text.charAt(index);
        index++;
        setTimeout(type, this.TYPING_SPEED);
      } else {
        this.finishTyping(historyEntry, text, true, htmlOutput);
      }
    };

    type();
  }

  private finishTyping(
    historyEntry: CommandHistory,
    output: string,
    isHtml: boolean,
    htmlOutput?: string
  ): void {
    this.isTyping = false;
    historyEntry.output = output;
    historyEntry.isHtml = isHtml;
    if (htmlOutput) {
      historyEntry.htmlOutput = htmlOutput;
    }

    setTimeout(() => {
      this.displayedOutput = '';
      this.scrollToBottom();
      this.focusInput();
    }, 500);
  }

  // Contact Form Methods
  submitContactForm(): void {
    if (this.isContactFormValid()) {
      console.log('Contact form submitted:', this.contactForm);

      this.commandHistory.push({
        command: '',
        output: `✅ Message sent successfully! Thank you, ${this.contactForm.name}! I will get back to you soon.`,
        isHtml: false,
        timestamp: new Date(),
      });

      this.resetContactForm();
      this.isContactFormVisible = false;
      this.scrollToBottom();
      this.focusInput();
    }
  }

  cancelContactForm(): void {
    this.isContactFormVisible = false;
    this.resetContactForm();
  }

  private resetContactForm(): void {
    this.contactForm = { name: '', email: '', message: '' };
  }

  isContactFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.message.trim()
    );
  }

  private getAvailableCommands(): Command[] {
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
        name: 'history',
        description: 'Show command history',
        usage: 'history',
        example: 'history',
      },
      {
        name: 'clear',
        description: 'Clear the terminal screen',
        usage: 'clear',
        example: 'clear',
      },
    ];
  }

  private getPersonalInfo() {
    return {
      name: 'Bun Sengtri',
      profession: 'Web Development',
      about:
        "I am a motivated and adaptable individual with a strong foundation in programming, graphic design, and communication. Currently pursuing a Bachelor's degree in Management Information Systems (MIS), I bring creativity, problem-solving abilities, and a commitment to excellence in every project. My experience includes developing websites, creating innovative designs, and collaborating effectively within teams to achieve goals. With a passion for technology and continuous learning, I aim to contribute my skills to drive impactful results in a dynamic work environment.",
    };
  }

  private getSkillsDatabase() {
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

  private getExperienceData() {
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

  private getProjectData() {
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

  private getContactInfo() {
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
