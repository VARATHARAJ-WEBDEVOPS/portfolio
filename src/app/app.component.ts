import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  activeLink: string = 'profile';
  indicatorPosition: string = '0';
  isDark: boolean = false;
  @ViewChild('navigation', { static: true }) navigation!: ElementRef;
  
  constructor(private el: ElementRef, 
    private renderer: Renderer2,
    private router: Router) {}

  setActiveLink(link: string) {
    this.activeLink = link;
    this.updateIndicatorPosition(link);
  }

  updateIndicatorPosition(link: string) {
    const linkIndex = ['profile', 'about', 'skills', 'projects', 'contact'].indexOf(link);
    if (linkIndex >= 0) {
      this.indicatorPosition = `calc(7.3vh * ${linkIndex})`;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.style.setProperty('--clr', this.isDark ? '#000' : '#ECEDF8');
    document.documentElement.style.setProperty('--cardclr', this.isDark ? '#2d2c2e' : '#fff');
    document.documentElement.style.setProperty('--cardtxt', this.isDark ? '#fff' : '#000');
    document.documentElement.style.setProperty('--border', this.isDark ? '#fff' : '#2d2c2e');
  }

  ngAfterViewInit() {
    const sections = ['profile', 'about', 'skills', 'projects', 'contact'].map(id =>
      document.getElementById(id)
    );
  
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this.setActiveLink(id);
        }
      });
    }, observerOptions);
  
    sections.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });
    const texts = document.querySelectorAll('.texts');
    texts.forEach((element, index) => {
      const text = element as HTMLElement; // Cast to HTMLElement
      text.style.transform = `translate(-50%, -50%) rotate(var(--angle))`;
      text.style.transition = `${index * 0.2}s`;
    });
  }
  ngOnInit() {
    this.sections = document.querySelectorAll('section');
    const options = {
      strings: [
        'Web Developer',
        'Cross Platform developer',
        'UI and UX Designer',
      ],
      typeSpeed: 100, 
      backSpeed: 100,
      backDelay: 1000,   
      loop: true,  
    };

    const typed = new Typed('.typing-element', options);
  }

  sections!: NodeListOf<HTMLElement>;

  isSectionVisible(sectionId: string): boolean {
    const section = document.getElementById(sectionId);
    if (!section) return false;

    const top = window.scrollY;
    const offset = section.offsetTop;
    const height = section.offsetHeight;

    return top >= offset && top < offset + height;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.sections.forEach((sec: HTMLElement) => {
      const sectionId = sec.id;
      const isVisible = this.isSectionVisible(sectionId);

      if (isVisible) {
        this.renderer.addClass(sec, 'show-animate');
      } else {
        this.renderer.removeClass(sec, 'show-animate');
      }
    });
  }

downloadResume() {
  const resumeUrl = 'assets/Resume-Varatharaj.pdf'; // Corrected path
  const a = document.createElement('a');
  a.href = resumeUrl;
  a.download = 'resume-Varatharaj.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

navigateLinkedin() {
  window.open('https://www.linkedin.com/in/varatharaj-s-68a368282/', '_blank');
}

navigateInstagram() {
  window.open('https://www.instagram.com/__.black_cheetah/');
}

navigateGithub() {
  window.open('https://github.com/VARATHARAJ-WEBDEVOPS/');
}

navigateMail() {
  window.open('mailto:varathan2512002@gmail.com');
}


}

