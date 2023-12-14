// App.ts

class App {
    private currentStyle: string;
    private styles: { [styleName: string]: string };
  
    constructor() {
      this.currentStyle = 'css1'; // Default style
      this.styles = {
        css1: 'css1.css',
        css2: 'css2.css',
      };
  
      this.applyStyle();
    }
  
    private applyStyle() {
      const styleLink = document.getElementById('styleLink') as HTMLLinkElement | null;
  
      if (styleLink) {
        styleLink.href = this.styles[this.currentStyle];
      }
    }
  
    public toggleStyle() {
      this.currentStyle = this.currentStyle === 'css1' ? 'css2' : 'css1';
      this.applyStyle();
    }
  }
  
  const app = new App();
  
 
  document.addEventListener('DOMContentLoaded', () => {
    const styleChangeButton = document.getElementById('styleChangeButton');
  
    styleChangeButton?.addEventListener('click', () => {
      app.toggleStyle();
    });
  });
  