import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  signal,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'animate.css';
import { Command, CommandHistory, ContactForm } from '../../models/item';
import { ServicePortfolio } from '../../Service/service-portfolio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [FormsModule, CommonModule],
  templateUrl: './portfolio.html',
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
  language = signal('English');
  Rout = inject(Router);

  //injection Services
  getServices = inject(ServicePortfolio);
  getAvai = this.getServices.getAvailableCommands();
  getPer = this.getServices.getPersonalInfo();
  getSkill = this.getServices.getSkillsDatabase();
  getexp = this.getServices.getExperienceData();
  getproject = this.getServices.getProjectData();
  getContect = this.getServices.getContactInfo();
  getLink = this.getServices.getSocialLinks();

  //Feature Class And Language Change

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
        'Exit',
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
        'លុប',
        'ចាកចេញ',
      ],
    };
    return textMap[this.currentLanguage];
  }

  loading = signal<'loading' | 'active'>('loading');
  checkClassLoading() {
    setTimeout(() => {
      this.loading.update((up) => (up === 'active' ? 'loading' : 'active'));
    }, 300);
  }
  beforeCheck() {
    setTimeout(() => {
      this.loading.update((up) => (up === 'loading' ? 'active' : 'loading'));
    }, 300);
  }
  KhmerLanguaue() {
    if (this.currentLanguage == 'en') {
      setTimeout(() => {
        this.currentLanguage = 'km';
        this.language.set('ភាសាខ្មែរ');
        this.checkClassLoading();
      }, 1000);
      this.beforeCheck();
    } else {
      setTimeout(() => {
        this.currentLanguage = 'en';
        this.language.set('English');
        this.checkClassLoading();
      }, 1000);
      this.beforeCheck();
    }
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
  WelcomeChange() {
    const img = {
      en: 'welcome',
      km: 'ស្វាគមន៍',
    };
    return img[this.currentLanguage];
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

    const matchingCommands = this.getAvai.filter((cmd) =>
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
  showCloseConfirmation = false;

  closeApplication() {
    window.close();
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

      case 'experience': // Handle typo
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
      case 'exit':
        this.showCloseConfirmation = true;
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
    return Object.entries(this.getSkill)
      .map(([_, skill]) => `=== ${skill.title} ===\n\n${skill.content}\n`)
      .join('\n');
  }

  private getAboutOutput(): string {
    const info = this.getPer;
    return `=== ${info.name} ===\n\nProfession: ${info.profession}\n\n${info.about}`;
  }

  private getHelpOutput(commandName?: string): string {
    const commands = this.getAvai;

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
    return Object.entries(this.getexp)
      .map(
        ([_, exp]) =>
          `=== ${exp.title} ===\n\n${exp.content1}\n\n${exp.content2 || ''}\n`
      )
      .join('\n');
  }

  private getProjectOutput(): { text: string; html: string } {
    const projects = this.getproject;
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
    const info = this.getPer;
    return `=== ${info.name} ===\n\nProfession: ${info.profession}\n\n${info.about}`;
  }

  private getContactOutput(): { text: string; html: string } {
    const contact = this.getContect;

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
  isActive = true;
  isAc = true;
  hideNav() {
    return {
      navbarClass: this.isActive ? 'phone-view-wrapper' : 'active',
      iconClass: this.isAc ? 'bi bi-list' : 'bi bi-x-lg',
    };
  }
  clickNav() {
    this.isActive = !this.isActive;
    this.isAc = !this.isAc;
  }
}
